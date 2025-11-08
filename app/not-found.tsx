"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-destructive/20 bg-card/80 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>
            
            <div>
              <div className="text-8xl font-orbitron font-bold glow-text mb-4">
                404
              </div>
              <CardTitle className="text-2xl font-orbitron">
                Access Denied
              </CardTitle>
              <CardDescription className="font-mono text-base mt-2">
                system@whatthehack:~$ The requested resource could not be found
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/30 border border-border/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-destructive mb-2">ERROR_CODE: 404</div>
              <div className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved to a
                secure location. This incident has been logged.
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground font-mono text-center">
                Choose your next action:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="default"
                  className="font-mono h-auto py-3"
                  asChild
                >
                  <Link href="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Dashboard</div>
                      <div className="text-xs text-muted-foreground">Mission Control</div>
                    </div>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="font-mono h-auto py-3"
                  asChild
                >
                  <Link href="/learning-paths">
                    <Search className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Missions</div>
                      <div className="text-xs text-muted-foreground">Find challenges</div>
                    </div>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="font-mono h-auto py-3"
                  onClick={handleGoBack}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">Go Back</div>
                    <div className="text-xs text-muted-foreground">Previous page</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
                <span className="text-destructive">●</span>
                <span>SECURITY ALERT</span>
                <span>●</span>
                <span>Unauthorized access attempt logged</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Need help?{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              Return to Mission Control
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
