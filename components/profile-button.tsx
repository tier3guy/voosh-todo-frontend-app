"use client";

import { User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogout from "@/hooks/useLogout";

export default function ProfileButton() {
    const { loading, handleLogout } = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-9 w-9 overflow-hidden rounded-full bg-slate-50/30 grid place-content-center hover:bg-slate-50/40 z-20">
                <User className="text-gray-100/50" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5 w-[200px]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
