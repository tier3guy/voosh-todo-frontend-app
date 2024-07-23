"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { loading, error, handleLogin } = useLogin();

    return (
        <div className="w-screen h-screen overflow-hidden relative">
            <div className="h-1/2 w-full bg-gradient-to-b from-blue-500 to-blue-700">
                <div className="m-auto py-10 flex items-center flex-col">
                    <Logo color="white" logoFull />
                    <p className="text-slate-200 text-center mt-3 w-full md:w-[650px] px-4">
                        Create, track, and complete tasks seamlessly to ensure
                        you meet all your deadlines. Log in to get started and
                        take control of your workflow today!
                    </p>
                </div>
            </div>
            <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden grid place-content-center">
                {/* LOGIN FORM */}
                <div className="w-[500px] border shadow-lg p-6 bg-gradient-to-b from-gray-50 to-gray-100 mt-6 rounded-md">
                    <h1
                        className={cn(
                            "text-center text-3xl font-bold tracking-tight text-foreground"
                        )}
                    >
                        Sign in to your account
                    </h1>
                    <p className="mt-1 text-center text-primary">
                        Or{" "}
                        <Link
                            href="/auth/signup"
                            className="hover:text-primary/80"
                            prefetch={false}
                        >
                            register for a new account
                        </Link>
                    </p>
                    <div className="mt-4 flex flex-col gap-4">
                        <div className="grid w-full items-center gap-1.5 mt-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Password</Label>
                            <Input
                                type="password"
                                id="email"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="remember-me"
                                    name="remember-me"
                                    className="h-4 w-4 text-primary focus:ring-blue-600"
                                />
                                <Label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-muted-foreground"
                                >
                                    Remember me
                                </Label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    href="/auth/forget-passowrd"
                                    className="font-medium text-primary hover:text-primary/80"
                                    prefetch={false}
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-red-500 mb-2 text-sm">
                                {error === "Invalid credentials"
                                    ? "Either email or password is incorrect. Please try again."
                                    : error}
                            </p>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading}
                                onClick={() => {
                                    handleLogin(email, password);
                                }}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 py-4 text-sm text-muted-foreground w-full text-center px-4">
                <p>
                    All the contents are taken from ChatGPT and we do not claim
                    any copyrights. This is just a dummy project build under an
                    assignment.
                </p>
            </div>
        </div>
    );
}
