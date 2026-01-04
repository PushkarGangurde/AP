'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error boundary caught:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-white">Something went wrong!</h2>
                    <p className="text-slate-400">
                        We encountered an unexpected error. Don&apos;t worry, your data is safe.
                    </p>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <p className="text-red-400 text-sm font-mono">
                        {error.message || 'An unknown error occurred'}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-white text-black hover:bg-slate-200"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        Go home
                    </Button>
                </div>
            </div>
        </div>
    )
}
