import { type NextRequest, NextResponse } from "next/server"
import { dataStore } from "@/lib/store"
import { validateEmail, validateName, validatePhone, sanitizeInput } from "@/lib/validation"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Sanitize inputs
    const fullName = sanitizeInput(body.fullName || "")
    const email = sanitizeInput(body.email || "")
    const phone = sanitizeInput(body.phone || "")
    const password = body.password || ""

    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate input formats
    if (!validateName(fullName)) {
      return NextResponse.json(
        { error: "Full name must be between 2 and 50 characters" },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = dataStore.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      )
    }

    // Create new user
    const hashedPassword = await hashPassword(password)
    const newUser = dataStore.createUser({
      full_name: fullName,
      email: email.toLowerCase(),
      phone: phone,
      password_hash: hashedPassword,
    })

    // Generate verification token
    const verificationToken = generateToken()
    
    // In production, send verification email here
    console.log(`Verification email sent to: ${email}`)
    console.log(`Verification token: ${verificationToken}`)

    // Return success response (excluding sensitive data)
    const safeUser = {
      id: newUser.id,
      full_name: newUser.full_name,
      email: newUser.email,
      phone: newUser.phone,
      created_at: newUser.created_at,
    }

    return NextResponse.json({
      success: true,
      message: "Registration successful. Please check your email for verification.",
      data: safeUser,
    }, { status: 201 })

  } catch (error) {
    console.error("Registration failed:", error)
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    )
  }
} 