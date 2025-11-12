"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";


export default function LoginPage() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const onLogin = async () => {
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <h1 className="text-2xl font-bold">Login</h1>
                <hr />
                <label htmlFor="email">Email:</label>
                <input
                    className="p-2 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label htmlFor="password">Password:</label>
                <input
                    className="p-2 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={onLogin}>
                    Log In
                </button>
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Don't have an account? Sign up
                </Link>
            </div>
        </div>
    );
}
