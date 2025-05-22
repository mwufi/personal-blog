'use client'

import { useState } from 'react'
import { signup } from './actions'

export function SignupForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<string[]>([])

    const validatePasswords = () => {
        const newErrors: string[] = []

        if (password && password.length < 6) {
            newErrors.push('Password must be at least 6 characters long')
        }

        if (confirmPassword && password !== confirmPassword) {
            newErrors.push('Passwords do not match')
        }

        setErrors(newErrors)
        return newErrors.length === 0
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        // Validate after a short delay to avoid flickering
        setTimeout(validatePasswords, 300)
    }

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value)
        setTimeout(validatePasswords, 300)
    }

    const isFormValid = password.length >= 6 && password === confirmPassword && confirmPassword.length > 0

    return (
        <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-4 rounded-md shadow-sm">
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        className="relative block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground focus:z-10 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="off"
                        required
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="relative block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground focus:z-10 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="Password (minimum 6 characters)"
                        minLength={6}
                    />
                </div>
                <div>
                    <label htmlFor="confirm-password" className="sr-only">
                        Confirm Password
                    </label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        autoComplete="off"
                        required
                        value={confirmPassword}
                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                        className="relative block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground focus:z-10 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
                        placeholder="Confirm password"
                        minLength={6}
                    />
                </div>
            </div>

            {/* Real-time validation feedback */}
            {errors.length > 0 && (
                <div className="text-sm text-red-600 space-y-1">
                    {errors.map((error, index) => (
                        <p key={index}>• {error}</p>
                    ))}
                </div>
            )}

            {/* Success indicator */}
            {isFormValid && (
                <div className="text-sm text-green-600">
                    ✓ Passwords match and meet requirements
                </div>
            )}

            <div className="text-xs text-muted-foreground text-center">
                <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
            </div>

            <div>
                <button
                    formAction={signup}
                    disabled={!isFormValid}
                    className="group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Create account
                </button>
            </div>
        </form>
    )
} 