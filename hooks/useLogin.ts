"use client";

import axios from "@/axios.config";
import { useState } from "react";
import { BACKEND_BASE_URL } from "@/constants";
import { useRouter } from "next/navigation";

const useLogin = (): {
    loading: boolean;
    error: string;
    handleLogin: (email: string, password: string) => void;
} => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleLogin = async (email: string, password: string) => {
        try {
            setError("");
            setLoading(true);

            const res = await axios.post(BACKEND_BASE_URL + "/api/auth/login", {
                email,
                password,
            });
            if (res.status === 200) {
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

    return { loading, error, handleLogin };
};

export default useLogin;
