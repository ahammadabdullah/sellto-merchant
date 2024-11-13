"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/actions/actions";
const initialState = {
  message: null as string | null,
  errors: {} as {
    email?: string[];
    password?: string[];
  },
};

export default function LoginForm() {
  const [state, setState] = useState(initialState);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setPending(true);

    const result = await login(state, formData);
    setPending(false);
    if ("email" in result?.errors || "password" in result?.errors) {
      setState((prev) => ({
        ...prev,
        errors: result?.errors || {},
      }));
    } else if (result?.redirectUrl) {
      router.push(result?.redirectUrl);
    }
    setState((prev) => ({
      ...prev,
      message: result?.message || null,
    }));
    console.log(result);
  }

  return (
    <Card className="max-w-[390px] border-none shadow-none">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>

              <Link
                href="/forgotpass"
                className="ml-auto inline-block text-xs hover:underline text-muted-foreground"
              >
                Forgot your password?
              </Link>
            </div>
            <Input name="password" id="password" type="password" required />
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Loading..." : "Login"}
            </Button>
            <p className="text-sm text-muted-foreground">
              Not signed up?{" "}
              <Link href={"/signup"}>
                <Button variant={"link"} className="p-0 text-primary2">
                  Sign up
                </Button>
              </Link>{" "}
              for free.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" className="w-full" disabled={pending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 22 22"
            className="fill-foreground mt-[-2px] mr-2"
          >
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
          </svg>
          Google
        </Button>
        {Object.keys(state.errors).length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              {state?.errors?.email && <p>{state?.errors?.email}</p>}
              {state?.errors?.password && <p>{state?.errors?.password}</p>}
            </AlertDescription>
          </Alert>
        )}
        {state.message && (
          <Alert variant="default">
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
