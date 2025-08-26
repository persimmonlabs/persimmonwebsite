import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name = '', source = 'website', type = 'lead' } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get webhook URL from environment
    const WEBHOOK_URL = process.env.WEBHOOK_URL || process.env.NEXT_PUBLIC_WEBHOOK_URL

    if (WEBHOOK_URL) {
      // Send to webhook (Zapier, Make, n8n, etc.)
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          source,
          type,
          timestamp: new Date().toISOString(),
          website: 'persimmonlabs.cc',
        }),
      })

      if (!webhookResponse.ok) {
        console.error('Webhook failed:', webhookResponse.statusText)
        // Don't fail the request, still return success to user
      }
    } else {
      // Log for development
      console.log('Email captured (no webhook configured):', {
        email,
        name,
        source,
        type,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll be in touch soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing webhook:', error)
    // Still return success to not lose the lead
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your interest!',
      },
      { status: 200 }
    )
  }
}