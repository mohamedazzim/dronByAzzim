"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ErrorMessage } from "@/components/error-message"
import { LoadingSpinner } from "@/components/loading-spinner"
import { validateEmail } from "@/lib/validation"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validate email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || "Failed to send reset email. Please try again.")
      }
    } catch (error) {
      console.error("Forgot password failed:", error)
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError("")
  }

  if (success) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/drone-cinematic-hero.jpg"
            alt="Professional Drone in Action"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md">
            <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-600"></div>
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Email Sent!</CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Check your email for password reset instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 text-center">
                <p className="text-gray-600 mb-6">
                  If an account with the email <strong>{email}</strong> exists, you will receive a password reset link shortly.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Back to Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSuccess(false)
                      setEmail("")
                    }}
                    className="w-full"
                  >
                    Try Another Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/drone-cinematic-hero.jpg"
          alt="Professional Drone in Action"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-2xl">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
                    <path
                      d="M12 8L13.09 14.26L22 15L13.09 15.74L12 22L10.91 15.74L2 15L10.91 14.26L12 8Z"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Reset Password</h1>
            <p className="text-xl text-gray-200 font-medium">Forgot your password?</p>
            <p className="text-gray-300 mt-2">Enter your email to receive reset instructions</p>
          </div>

          <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-0 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Forgot Password</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {error && <ErrorMessage message={error} onDismiss={() => setError("")} className="mb-6" />}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-11 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none disabled:opacity-50 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Sending Reset Link...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold"
                    onClick={() => router.push("/")}
                  >
                    Sign In
                  </Button>
                </p>
              </div>

              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => router.push("/")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 