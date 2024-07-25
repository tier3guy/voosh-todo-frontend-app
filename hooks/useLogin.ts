"use client";

import axios from "@/axios.config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { AUTH_TOKEN } from "@/constants";
import { auth, provider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";

const useLogin = (): {
    loading: boolean;
    error: string;
    handleLogin: (email: string, password: string) => void;
    handleLoginWithGoogle: () => void;
} => {
    const router = useRouter();
    const cookies = useCookies();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async (email: string, password: string) => {
        try {
            setError("");
            setLoading(true);

            const res = await axios.post("/api/auth/login", {
                email,
                password,
            });
            if (res.status === 200) {
                const { auth_token } = res.data;
                cookies.set(AUTH_TOKEN, auth_token, {
                    expires: 24 * 60 * 60 * 1000,
                });
                router.push("/");
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

    const handleLoginWithGoogle = async () => {
        try {
            setError("");
            setLoading(true);

            const res = await signInWithPopup(auth, provider);
            const resp = await axios.post("/api/auth/google-login", {
                email: res?.user?.email,
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
        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleLogin, handleLoginWithGoogle };
};

export default useLogin;
