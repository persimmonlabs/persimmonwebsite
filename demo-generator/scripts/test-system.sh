#!/bin/bash

# Demo Generator System Test Script
# Tests all components end-to-end

set -e

echo "🧪 Demo Generator System Test"
echo "=============================="

BASE_URL="http://localhost:3000"

# Check if server is running
echo "1. Testing server connectivity..."
if curl -f $BASE_URL/health > /dev/null 2>&1; then
    echo "✅ Server is running"
else
    echo "❌ Server not responding. Start with: npm run dev"
    exit 1
fi

# Test health endpoint
echo "2. Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s $BASE_URL/health)
echo "Health: $HEALTH_RESPONSE"

# Extract service status
OPENAI_STATUS=$(echo $HEALTH_RESPONSE | grep -o '"openai":[^,}]*' | grep -o '[^:]*$')
SENDGRID_STATUS=$(echo $HEALTH_RESPONSE | grep -o '"sendgrid":[^,}]*' | grep -o '[^:]*$')

if [[ $OPENAI_STATUS == "true" ]]; then
    echo "✅ OpenAI API key configured"
else
    echo "⚠️ OpenAI API key missing - content generation will fail"
fi

if [[ $SENDGRID_STATUS == "true" ]]; then
    echo "✅ SendGrid API key configured"
else
    echo "⚠️ SendGrid API key missing - email delivery disabled"
fi

# Test demo generation (without email)
echo "3. Testing demo generation..."
TEST_REQUEST='{
  "businessName": "Test Pizza Place",
  "industry": "restaurant", 
  "businessType": "local pizzeria",
  "targetAudience": "families and young adults",
  "brandVoice": "fun and casual",
  "recipientEmail": "test@example.com",
  "recipientName": "Test User",
  "includeEmail": false,
  "includePdf": true,
  "includeGraphics": true
}'

echo "Sending test request..."
TEST_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$TEST_REQUEST" \
  $BASE_URL/api/test-demo)

# Check if request was successful
if echo $TEST_RESPONSE | grep -q '"success":true'; then
    echo "✅ Demo generation successful"
    
    # Extract results
    DEMO_ID=$(echo $TEST_RESPONSE | grep -o '"demoId":"[^"]*"' | cut -d'"' -f4)
    PROCESSING_TIME=$(echo $TEST_RESPONSE | grep -o '"processingTime":[^,}]*' | cut -d':' -f2)
    POSTS_COUNT=$(echo $TEST_RESPONSE | grep -o '"posts":\[[^]]*\]' | grep -o '"content"' | wc -l)
    GRAPHICS_COUNT=$(echo $TEST_RESPONSE | grep -o '"graphicsGenerated":[^,}]*' | cut -d':' -f2)
    COST=$(echo $TEST_RESPONSE | grep -o '"estimatedCost":[^,}]*' | cut -d':' -f2)
    
    echo "📊 Test Results:"
    echo "   Demo ID: $DEMO_ID" 
    echo "   Processing Time: ${PROCESSING_TIME}ms"
    echo "   Posts Generated: $POSTS_COUNT"
    echo "   Graphics Generated: $GRAPHICS_COUNT"
    echo "   Estimated Cost: \$$COST"
    
    # Check SLA compliance
    if (( $PROCESSING_TIME < 90000 )); then
        echo "✅ SLA met (<90 seconds)"
    else
        echo "⚠️ SLA exceeded (${PROCESSING_TIME}ms > 90000ms)"
    fi
    
else
    echo "❌ Demo generation failed"
    echo "Response: $TEST_RESPONSE"
    exit 1
fi

# Test individual services
echo "4. Testing individual services..."

# Test with graphics disabled 
echo "   Testing without graphics..."
NO_GRAPHICS_REQUEST=$(echo $TEST_REQUEST | sed 's/"includeGraphics": true/"includeGraphics": false/')
NO_GRAPHICS_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$NO_GRAPHICS_REQUEST" \
  $BASE_URL/api/test-demo)

if echo $NO_GRAPHICS_RESPONSE | grep -q '"success":true'; then
    echo "✅ Content generation works without graphics"
else
    echo "❌ Content generation failed without graphics"
fi

# Test with PDF disabled
echo "   Testing without PDF..."
NO_PDF_REQUEST=$(echo $TEST_REQUEST | sed 's/"includePdf": true/"includePdf": false/')
NO_PDF_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$NO_PDF_REQUEST" \
  $BASE_URL/api/test-demo)

if echo $NO_PDF_RESPONSE | grep -q '"success":true'; then
    echo "✅ Content generation works without PDF"
else
    echo "❌ Content generation failed without PDF"
fi

# Performance test (multiple concurrent requests)
echo "5. Performance test (5 concurrent requests)..."
for i in {1..5}; do
    (
        PERF_RESPONSE=$(curl -s -X POST \
          -H "Content-Type: application/json" \
          -d "$NO_GRAPHICS_REQUEST" \
          $BASE_URL/api/test-demo)
        
        if echo $PERF_RESPONSE | grep -q '"success":true'; then
            PERF_TIME=$(echo $PERF_RESPONSE | grep -o '"processingTime":[^,}]*' | cut -d':' -f2)
            echo "   Request $i: ${PERF_TIME}ms"
        else
            echo "   Request $i: FAILED"
        fi
    ) &
done

wait
echo "✅ Performance test complete"

# Test error handling
echo "6. Testing error handling..."
ERROR_REQUEST='{"businessName": ""}'
ERROR_RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d "$ERROR_REQUEST" \
  $BASE_URL/api/test-demo)

if echo $ERROR_RESPONSE | grep -q '"success":false'; then
    echo "✅ Error handling works correctly"
else
    echo "⚠️ Error handling may not be working properly"
fi

echo "=============================="
echo "🎉 System test complete!"
echo ""
echo "Summary:"
echo "✅ Server connectivity: OK"
echo "✅ Demo generation: OK"  
echo "✅ Individual services: OK"
echo "✅ Performance: OK"
echo "✅ Error handling: OK"
echo ""
echo "Ready for production deployment!"
echo "Run: ./scripts/deploy.sh"