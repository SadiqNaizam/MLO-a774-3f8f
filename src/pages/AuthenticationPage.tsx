import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // For query param and navigation
import { AlertCircle, LogIn, UserPlus } from 'lucide-react';

// Define Zod schemas for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters."}),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms."}),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // path of error
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthenticationPage = () => {
  console.log('AuthenticationPage loaded');
  const location = useLocation();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');
    if (mode === 'register') {
      setAuthMode('register');
    } else {
      setAuthMode('login');
    }
  }, [location.search]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '', agreeTerms: false },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    setFormError(null);
    setFormSuccess(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (data.email === "user@example.com" && data.password === "password") {
      setFormSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setFormError("Invalid email or password.");
      loginForm.reset(); // Reset form on error
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    console.log('Register form submitted:', data);
    setFormError(null);
    setFormSuccess(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormSuccess("Registration successful! Please login.");
    // registerForm.reset(); // Reset form on success
    setTimeout(() => {
      setAuthMode('login');
      navigate('/auth?mode=login'); // Or just /auth
      loginForm.setValue('email', data.email); // Pre-fill email for login
    }, 1500);
  };

  const toggleMode = () => {
    setFormError(null);
    setFormSuccess(null);
    loginForm.reset();
    registerForm.reset();
    const newMode = authMode === 'login' ? 'register' : 'login';
    setAuthMode(newMode);
    navigate(`/auth?mode=${newMode}`);
  };
  
  const commonFormClasses = "space-y-4";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Link to="/" className="mb-8 text-3xl font-bold text-primary">
        LogoMaker
      </Link>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            {authMode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
          </CardTitle>
          <CardDescription>
            {authMode === 'login' ? 'Login to access your dashboard.' : 'Join us to start creating amazing logos.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          {formSuccess && (
            <Alert variant="default" className="mb-4 bg-green-100 border-green-300 text-green-700">
               {/* No default success variant, custom styling or use a success icon */}
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{formSuccess}</AlertDescription>
            </Alert>
          )}

          {authMode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className={commonFormClasses}>
              <div>
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="you@example.com" {...loginForm.register('email')} className="mt-1" />
                {loginForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password-login">Password</Label>
                <Input id="password-login" type="password" placeholder="••••••••" {...loginForm.register('password')} className="mt-1" />
                {loginForm.formState.errors.password && <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" {...loginForm.register('rememberMe')} />
                  <Label htmlFor="rememberMe" className="text-sm font-normal">Remember me</Label>
                </div>
                <Link to="/forgot-password" // Assuming a forgot password page
                  className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                <LogIn className="mr-2 h-4 w-4" /> {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className={commonFormClasses}>
              <div>
                <Label htmlFor="username-register">Username</Label>
                <Input id="username-register" placeholder="yourusername" {...registerForm.register('username')} className="mt-1" />
                {registerForm.formState.errors.username && <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.username.message}</p>}
              </div>
              <div>
                <Label htmlFor="email-register">Email</Label>
                <Input id="email-register" type="email" placeholder="you@example.com" {...registerForm.register('email')} className="mt-1" />
                {registerForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="password-register">Password</Label>
                <Input id="password-register" type="password" placeholder="••••••••" {...registerForm.register('password')} className="mt-1" />
                {registerForm.formState.errors.password && <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword-register">Confirm Password</Label>
                <Input id="confirmPassword-register" type="password" placeholder="••••••••" {...registerForm.register('confirmPassword')} className="mt-1" />
                {registerForm.formState.errors.confirmPassword && <p className="text-sm text-destructive mt-1">{registerForm.formState.errors.confirmPassword.message}</p>}
              </div>
               <div className="flex items-start space-x-2">
                  <Checkbox id="agreeTerms" {...registerForm.register('agreeTerms')} className="mt-1"/>
                  <Label htmlFor="agreeTerms" className="text-sm font-normal leading-tight">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms and Conditions</Link>.
                  </Label>
                </div>
                {registerForm.formState.errors.agreeTerms && <p className="text-sm text-destructive -mt-2">{registerForm.formState.errors.agreeTerms.message}</p>}

              <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" /> {registerForm.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
           <p className="text-muted-foreground">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Button variant="link" onClick={toggleMode} className="font-semibold text-primary px-1">
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </Button>
          </p>
          <Button variant="outline" className="w-full mt-4">
            {/* Placeholder for social login, e.g., Google */}
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path><path fill="#4A90E2" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path><path fill="#FBBC05" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path><path fill="none" d="M1 1h22v22H1z"></path></svg>
            Sign {authMode === 'login' ? 'in' : 'up'} with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticationPage;