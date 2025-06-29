import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"
import { validateEmail, sanitizeInput } from "@/lib/validation"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = sanitizeInput(body.email || "")

    // Validate email
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = dataStore.getUserByEmail(email)
    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        success: true,
        message: "If an account with this email exists, you will receive a password reset link.",
      })
    }

    // Generate reset token
    const resetToken = generateToken()
    const resetExpiry = new Date(Date.now() + 3600000) // 1 hour from now

    // In production, store the reset token in the database
    // For demo purposes, we'll just log it
    console.log(`Password reset token for ${email}: ${resetToken}`)
    console.log(`Reset token expires: ${resetExpiry.toISOString()}`)

    // In production, send email with reset link
    // For demo purposes, we'll just return success
    console.log(`Password reset email sent to: ${email}`)

    return NextResponse.json({
      success: true,
      message: "If an account with this email exists, you will receive a password reset link.",
    })

  } catch (error) {
    console.error("Forgot password failed:", error)
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    )
  }
} 