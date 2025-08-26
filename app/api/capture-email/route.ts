import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

// Simple direct Google Sheets integration
// For production, consider using a service account or OAuth2
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source = 'website', type = 'demo' } = body

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

    // For now, we'll use a webhook to Google Forms/Sheets
    // This is the simplest approach without authentication
    const GOOGLE_FORMS_URL = process.env.GOOGLE_FORMS_URL || ''
    
    if (!GOOGLE_FORMS_URL) {
      // Fallback: Store in a local JSON file or database
      console.log('Email captured:', { email, source, type, timestamp: new Date().toISOString() })
      
      // You can also send to a webhook service like Zapier/Make
      // or use a simpler service like EmailOctopus, ConvertKit, etc.
      
      return NextResponse.json(
        { success: true, message: 'Email captured successfully' },
        { status: 200 }
      )
    }

    // Send to Google Forms (which auto-populates Google Sheets)
    const formData = new URLSearchParams()
    formData.append('entry.123456789', email) // Replace with your form field ID
    formData.append('entry.987654321', source) // Replace with your form field ID
    formData.append('entry.111111111', type) // Replace with your form field ID
    
    const response = await fetch(GOOGLE_FORMS_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to submit to Google Forms')
    }

    return NextResponse.json(
      { success: true, message: 'Email captured successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error capturing email:', error)
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    )
  }
}

// Alternative: Direct Google Sheets API (requires service account)
export async function POST_WITH_SERVICE_ACCOUNT(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source = 'website', type = 'demo' } = body

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID

    // Append row to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          email,
          source,
          type
        ]],
      },
    })

    return NextResponse.json(
      { success: true, message: 'Email captured successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error capturing email:', error)
    return NextResponse.json(
      { error: 'Failed to capture email' },
      { status: 500 }
    )
  }
}