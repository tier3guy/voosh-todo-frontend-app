"use client";

import axios from "@/axios.config";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { AUTH_TOKEN } from "@/constants";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

const useLogout = (): {
    loading: boolean;
    handleLogout: () => void;
} => {
    const cookies = useCookies();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            setLoading(true);

            const res = await axios.post("/api/auth/logout");
            if (res.status === 200) {
                signOut(auth);
                cookies.remove(AUTH_TOKEN);
                router.push("/auth/login");
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleLogout };
};

export default useLogout;
