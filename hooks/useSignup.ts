"use client";

import axios from "@/axios.config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { AUTH_TOKEN } from "@/constants";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { isValidEmail } from "@/lib/utils";

const useSignup = (): {
    loading: boolean;
    error: string;
    handleSignup: (
        email: string,
        password: string,
        confimPassword: string,
        fname: string,
        lname: string
    ) => void;
    handleSignupWithGoogle: () => void;
} => {
    const router = useRouter();
    const cookies = useCookies();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSignup = async (
        email: string,
        password: string,
        confimPassword: string,
        fname: string,
        lname: string
    ) => {
        if (!fname || !email || !password || !confimPassword) {
            setError("Please fill all the necessary fields");
            return;
        } else if (password !== confimPassword) {
            setError("Password and Confirm Password does not match");
            return;
        } else if (!isValidEmail(email)) {
            setError("Invalid Email");
            return;
        }

        try {
            setError("");
            setLoading(true);

            const res = await axios.post("/api/auth/signup", {
                fname,
                lname,
                email,
                password,
            });

            if (res.status === 201) {
                router.push("/auth/login");
            } else {
                setError(res.data);
            }
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleSignupWithGoogle = async () => {
        try {
            setError("");
            setLoading(true);

            const res = await signInWithPopup(auth, provider);
            // @ts-ignore
            const data = res?._tokenResponse;
            const { firstName, lastName, email } = data;

            const resp = await axios.post("/api/auth/signup-with-google", {
                email,
                fname: firstName,
                lname: lastName,
            });
            if (resp.status === 200) {
                const { auth_token } = resp.data;
                cookies.set(AUTH_TOKEN, auth_token, {
                    expires: 24 * 60 * 60 * 1000,
                });
                router.push("/");
            } else {
                setError(resp.data);
            }

            console.log(res);
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleSignup, handleSignupWithGoogle };
};

export default useSignup;
