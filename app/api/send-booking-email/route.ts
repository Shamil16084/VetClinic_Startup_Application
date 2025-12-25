import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { doctorName, doctorSpecialty, doctorLocation, doctorContact, petName, ownerPhone, slot, bookedAt } = body

    // Email content
    const emailContent = `
New Appointment Booking - VetBooking.az

Doctor: ${doctorName}
Specialty: ${doctorSpecialty}
Location: ${doctorLocation}
Doctor Contact: ${doctorContact}

Pet Name: ${petName}
Owner Phone: ${ownerPhone}
Time Slot: ${slot}
Booked At: ${bookedAt}
    `

    // Using Resend API (you'll need to add RESEND_API_KEY to environment variables)
    const resendApiKey = process.env.RESEND_API_KEY

    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "VetBooking <onboarding@resend.dev>",
        to: ["fehlefehle6@gmail.com"],
        subject: `New Appointment: ${petName} with ${doctorName}`,
        text: emailContent,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
