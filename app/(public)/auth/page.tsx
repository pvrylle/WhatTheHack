"use client"

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

// Password strength calculator
const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
  if (!password) return { strength: 0, label: "", color: "" };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return { strength, label: "Weak", color: "text-destructive" };
  if (strength <= 4) return { strength, label: "Medium", color: "text-warning" };
  return { strength, label: "Strong", color: "text-success" };
};

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("login");
  
  // Form validation states
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [signupTouched, setSignupTouched] = useState<Record<string, boolean>>({});
  const [passwordStrength, setPasswordStrength] = useState({ strength: 0, label: "", color: "" });
  const [passwordValue, setPasswordValue] = useState("");
  const [mounted, setMounted] = useState(false);
  
  const { login, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoginErrors({});
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data: LoginFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    
    // Validate
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setLoginErrors(errors);
      return;
    }
    
    setIsLoading(true);
    const authResult = await login(data.email, data.password);
    
    if (authResult.success) {
      setSuccess("Access granted! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setError(authResult.error || "Authentication failed");
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSignupErrors({});
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data: SignupFormData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    
    // Validate
    const result = signupSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setSignupErrors(errors);
      return;
    }
    
    setIsLoading(true);
    const authResult = await signup(data.username, data.email, data.password);
    
    if (authResult.success) {
      setSuccess("Account created! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setError(authResult.error || "Registration failed");
    }
    
    setIsLoading(false);
  };

  const handlePasswordChange = (password: string) => {
    setPasswordValue(password);
    setPasswordStrength(getPasswordStrength(password));
  };

  const validateField = (field: string, value: string, formType: "login" | "signup") => {
    if (formType === "login") {
      const result = loginSchema.safeParse({ [field]: value });
      if (!result.success) {
        const error = result.error.errors.find((e) => e.path[0] === field);
        if (error) {
          setLoginErrors((prev) => ({ ...prev, [field]: error.message }));
        } else {
          setLoginErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      } else {
        setLoginErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } else {
      setSignupTouched((prev) => ({ ...prev, [field]: true }));
      // For signup, we validate the whole form due to password confirmation
      const form = document.querySelector(`form[data-form="signup"]`) as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const data: Partial<SignupFormData> = {
          username: formData.get("username") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          confirmPassword: formData.get("confirmPassword") as string,
        };
        
        const result = signupSchema.safeParse(data);
        if (!result.success) {
          const errors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              errors[err.path[0] as string] = err.message;
            }
          });
          setSignupErrors(errors);
        } else {
          setSignupErrors({});
        }
      }
    }
  };

  const demoAccounts = [
    { email: "demo@hack.com", password: "demo123", rank: "Elite Hacker", color: "text-primary" },
    { email: "admin@hack.com", password: "admin123", rank: "Master Hacker", color: "text-accent" },
    { email: "test@hack.com", password: "test123", rank: "Rookie Hacker", color: "text-secondary" }
  ];

  const fillDemoAccount = useCallback((email: string, password: string) => {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (emailInput) {
      emailInput.value = email;
      emailInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
    if (passwordInput) {
      passwordInput.value = password;
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string, accountEmail: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountEmail);
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 diagonal-stripes opacity-20" />
      
      {/* Floating particles effect - Client only to avoid hydration mismatch */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            // Use index-based pseudo-random to avoid hydration mismatch
            const seed = i * 0.618033988749895; // Golden ratio for better distribution
            const left = ((seed * 100) % 100);
            const top = (((seed * 1.618) * 100) % 100);
            const delay = ((seed * 2) % 2);
            const duration = 2 + ((seed * 2) % 2);
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              />
            );
          })}
        </div>
      )}
      
      <div className="relative w-full max-w-lg z-10">
        {/* Back Button */}
        <Button
          asChild
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground transition-all group"
        >
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </Button>

        <Card className="border-2 border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          {/* Glowing border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl" />
          
          <CardHeader className="text-center space-y-4 pb-6 relative z-10">
            <div className="flex justify-center mb-2">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <Image
                  src="/logo-wth 1.svg"
                  alt="WhatTheHack Logo"
                  width={80}
                  height={80}
                  className="relative animate-pulse"
                  priority
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-4xl font-orbitron font-black glow-text mb-2">
                ACCESS TERMINAL
              </CardTitle>
              <CardDescription className="font-mono text-sm text-muted-foreground">
                Enter your credentials to continue hacking
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 relative z-10">
            {/* Demo Accounts Info */}
            <Collapsible open={showDemoAccounts} onOpenChange={setShowDemoAccounts}>
              <Alert className="border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <AlertDescription className="font-mono text-sm font-semibold text-primary">
                      Demo Accounts Available
                    </AlertDescription>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 hover:bg-primary/20"
                      aria-label={showDemoAccounts ? "Hide demo accounts" : "Show demo accounts"}
                    >
                      {showDemoAccounts ? (
                        <ChevronUp className="h-4 w-4 text-primary" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="mt-4 space-y-3 pt-4 border-t border-primary/20">
                    {demoAccounts.map((account, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge 
                            variant="outline" 
                            className={`text-xs font-semibold ${account.color} border-current`}
                          >
                            {account.rank}
                          </Badge>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <code className="text-muted-foreground">{account.email}</code>
                            <span className="text-muted-foreground">•</span>
                            <code className="text-muted-foreground">{account.password}</code>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fillDemoAccount(account.email, account.password)}
                            className="h-7 px-3 text-xs font-mono border border-primary/30 rounded-md bg-background hover:bg-primary/10 text-foreground transition-all hover:scale-105"
                          >
                            Use
                          </button>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(`${account.email}:${account.password}`, account.email)}
                            className="h-7 w-7 p-0 flex items-center justify-center rounded-md hover:bg-muted transition-all hover:scale-105"
                          >
                            {copiedAccount === account.email ? (
                              <Check className="h-3 w-3 text-success" />
                            ) : (
                              <Copy className="h-3 w-3 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Alert>
            </Collapsible>

            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="font-mono">{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-success/30 bg-success/10 animate-in slide-in-from-top-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="font-mono text-success">{success}</AlertDescription>
              </Alert>
            )}
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 border border-border/50">
                <TabsTrigger 
                  value="login" 
                  className="font-mono data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="font-mono data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-lg transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-mono text-sm font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`font-mono h-11 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all ${
                          loginErrors.email ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        defaultValue="demo@hack.com"
                        onBlur={(e) => validateField("email", e.target.value, "login")}
                        onChange={() => {
                          if (loginErrors.email) {
                            validateField("email", (document.getElementById("email") as HTMLInputElement).value, "login");
                          }
                        }}
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {loginErrors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-mono text-sm font-semibold">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pr-10 font-mono h-11 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all ${
                          loginErrors.password ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        defaultValue="demo123"
                        onBlur={(e) => validateField("password", e.target.value, "login")}
                        onChange={() => {
                          if (loginErrors.password) {
                            validateField("password", (document.getElementById("password") as HTMLInputElement).value, "login");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent z-10"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </Button>
                    </div>
                    {loginErrors.password && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {loginErrors.password}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-mono bg-primary hover:bg-primary/90 text-primary-foreground h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Authenticating...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      className="text-muted-foreground font-mono text-sm hover:text-primary transition-colors"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} data-form="signup" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="font-mono text-sm font-semibold">
                      Agent Codename
                    </Label>
                    <div className="relative">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Choose your hacker alias"
                        className={`font-mono h-11 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all ${
                          signupErrors.username ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        onBlur={(e) => validateField("username", e.target.value, "signup")}
                        onChange={(e) => {
                          if (signupTouched.username || signupErrors.username) {
                            validateField("username", e.target.value, "signup");
                          }
                        }}
                      />
                    </div>
                    {signupErrors.username && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {signupErrors.username}
                      </p>
                    )}
                    {!signupErrors.username && signupTouched.username && (
                      <p className="text-xs text-success font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Valid username
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="font-mono text-sm font-semibold">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your secure email"
                        className={`font-mono h-11 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all ${
                          signupErrors.email ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        onBlur={(e) => validateField("email", e.target.value, "signup")}
                        onChange={(e) => {
                          if (signupTouched.email || signupErrors.email) {
                            validateField("email", e.target.value, "signup");
                          }
                        }}
                      />
                    </div>
                    {signupErrors.email && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {signupErrors.email}
                      </p>
                    )}
                    {!signupErrors.email && signupTouched.email && (
                      <p className="text-xs text-success font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Valid email
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="font-mono text-sm font-semibold">
                      Secure Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`pr-10 font-mono h-11 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all ${
                          signupErrors.password ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        onChange={(e) => {
                          const value = e.target.value;
                          handlePasswordChange(value);
                          if (signupTouched.password || signupErrors.password) {
                            validateField("password", value, "signup");
                          }
                        }}
                        onBlur={(e) => validateField("password", e.target.value, "signup")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent z-10"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </Button>
                    </div>
                    {signupErrors.password && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {signupErrors.password}
                      </p>
                    )}
                    {passwordStrength.label && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`font-mono ${passwordStrength.color}`}>
                            Password Strength: {passwordStrength.label}
                          </span>
                          <div className="flex gap-1">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1 w-4 rounded transition-all ${
                                  i < passwordStrength.strength
                                    ? passwordStrength.strength <= 2
                                      ? "bg-destructive"
                                      : passwordStrength.strength <= 4
                                      ? "bg-warning"
                                      : "bg-success"
                                    : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono space-y-0.5">
                          <p className={/[A-Z]/.test(passwordValue) ? "text-success" : ""}>
                            • Uppercase letter
                          </p>
                          <p className={/[a-z]/.test(passwordValue) ? "text-success" : ""}>
                            • Lowercase letter
                          </p>
                          <p className={/[0-9]/.test(passwordValue) ? "text-success" : ""}>
                            • Number
                          </p>
                          <p className={/[^A-Za-z0-9]/.test(passwordValue) ? "text-success" : ""}>
                            • Special character
                          </p>
                          <p className={passwordValue.length >= 8 ? "text-success" : ""}>
                            • At least 8 characters
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="font-mono text-sm font-semibold">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pr-10 font-mono h-11 border-border/50 focus:border-accent/50 focus:ring-accent/20 transition-all ${
                          signupErrors.confirmPassword ? "border-destructive focus:border-destructive" : ""
                        }`}
                        required
                        onBlur={(e) => validateField("confirmPassword", e.target.value, "signup")}
                        onChange={(e) => {
                          if (signupTouched.confirmPassword || signupErrors.confirmPassword) {
                            validateField("confirmPassword", e.target.value, "signup");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent z-10"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                        )}
                      </Button>
                    </div>
                    {signupErrors.confirmPassword && (
                      <p className="text-xs text-destructive font-mono flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {signupErrors.confirmPassword}
                      </p>
                    )}
                    {!signupErrors.confirmPassword && signupTouched.confirmPassword && (
                      <p className="text-xs text-success font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Passwords match
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-mono bg-accent hover:bg-accent/90 text-accent-foreground h-11 text-base font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground font-mono">
                    By signing up, you agree to our{" "}
                    <Button variant="link" className="h-auto p-0 text-xs text-primary hover:underline">
                      Terms of Service
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="bg-card/60 backdrop-blur border border-border/50 rounded-lg p-4 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-50 animate-pulse" />
            <div className="font-mono text-sm relative z-10">
              <span className="text-success font-semibold">system@whthehack:~$</span>{" "}
              <span className="text-muted-foreground">
                {isLoading ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="animate-pulse">Processing authentication...</span>
                  </span>
                ) : success ? (
                  <span className="text-success">Access granted. Redirecting...</span>
                ) : (
                  "Secure connection established"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
