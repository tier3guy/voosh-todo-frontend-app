"use client";

import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import useSignup from "@/hooks/useSignup";

export default function Signup() {
    const [fname, setFname] = useState<string>("");
    const [lname, setLname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confimPassword, setConfimPassword] = useState<string>("");

    const { loading, error, handleSignup, handleSignupWithGoogle } =
        useSignup();

    return (
        <div className="w-screen h-screen overflow-hidden relative">
            <div className="h-1/2 w-full bg-gradient-to-b from-blue-500 to-blue-700">
                <div className="py-4 flex items-center flex-col">
                    <div className="me-8">
                        <Logo color="white" logoFull />
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 z-10 h-screen w-screen overflow-hidden grid place-content-center">
                {/* SIGNUP FORM */}
                <div className="w-[500px] border shadow-lg p-6 bg-gradient-to-b from-gray-50 to-gray-100 mt-6 rounded-md">
                    <h1
                        className={cn(
                            "text-center text-3xl font-bold tracking-tight text-foreground"
                        )}
                    >
                        Sign up a new account
                    </h1>
                    <p className="mt-1 text-center text-primary text-blue-600">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-blue-600  hover:underline"
                            prefetch={false}
                        >
                            Try Login
                        </Link>
                    </p>
                    <div className="mt-4 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="grid flex-1 items-center gap-1.5 mt-4">
                                <Label htmlFor="email">
                                    First Name{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="fname"
                                    placeholder="John"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </div>
                            <div className="grid flex-1 items-center gap-1.5 mt-4">
                                <Label htmlFor="email">Last Name</Label>
                                <Input
                                    type="lname"
                                    id="lname"
                                    placeholder="Doe"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="grid flex-1 items-center gap-1.5">
                                <Label htmlFor="email">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="grid flex-1 items-center gap-1.5">
                                <Label htmlFor="email">
                                    Confirm Password{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="password"
                                    id="cpassword"
                                    placeholder="password"
                                    value={confimPassword}
                                    onChange={(e) =>
                                        setConfimPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="flex-1 border" />
                            <p className="px-4">Or</p>
                            <div className="flex-1 border" />
                        </div>

                        <button
                            className="flex items-center justify-center gap-3 border text-center p-3 rounded-md text-sm bg-white shadow-md"
                            onClick={handleSignupWithGoogle}
                            disabled={loading}
                        >
                            <p>Sign Up with Google</p>
                        </button>

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
                                    handleSignup(
                                        email,
                                        password,
                                        confimPassword,
                                        fname,
                                        lname
                                    );
                                }}
                            >
                                {loading ? "Loading..." : "Sign In"}
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
