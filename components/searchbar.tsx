"use client";

import { useState } from "react";
import { Input } from "./ui/input";

export default function Searchbar() {
    const [query, setQuery] = useState("");

    return (
        <Input
            className=""
            placeholder="Search todos here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
