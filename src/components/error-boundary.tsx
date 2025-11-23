'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Container, Text } from '@/components/atoms'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Container>
          <div className="min-h-[60vh] flex items-center justify-center py-12">
            <Card className="border-2 border-destructive/50 bg-destructive/5 max-w-2xl w-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-destructive/20 border border-destructive/30">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle className="font-orbitron text-destructive">
                    System Error Detected
                  </CardTitle>
                </div>
                <CardDescription className="font-mono">
                  An unexpected error occurred. The system has been secured.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {this.state.error && (
                  <div className="space-y-2">
                    <Text size="sm" weight="semibold" mono className="text-destructive">
                      Error Details:
                    </Text>
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                      <Text size="sm" mono className="text-destructive/90 break-all">
                        {this.state.error.message || 'Unknown error occurred'}
                      </Text>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={this.handleReset}
                    variant="default"
                    className="font-mono"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                  <Button
                    variant="outline"
                    className="font-mono"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Home className="w-4 h-4 mr-2" />
                      Return to Dashboard
                    </Link>
                  </Button>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-mono text-muted-foreground hover:text-foreground">
                      Stack Trace (Development Only)
                    </summary>
                    <pre className="mt-2 p-4 rounded-lg bg-muted/50 text-xs font-mono overflow-auto max-h-64">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </CardContent>
            </Card>
          </div>
        </Container>
      )
    }

    return this.props.children
  }
}

