"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false); 
    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup response:", response.data);
            if (response.data.success) {
                router.push("/login");
            } else {
                alert("Signup failed: " + response.data.error);
            }
        }
        catch (error: any) {
            console.log("Signup error:", error.message);
            alert("Signup failed: " + (error.response?.data?.error || error.message));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);  
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                <h1 className="text-2xl font-bold">{loading ? "Processing" : "Sign Up"}</h1>
                <hr />
                <label htmlFor="username">Username:</label>
                <input
                    className="p-2 bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700"
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
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
                    onClick={onSignup}>
                    {buttonDisabled ? "Signing Up..." : "Sign Up"}
                </button>
                <Link href="/login" className="text-blue-600 hover:underline">
                    Already have an account? Log in
                </Link>
            </div>
        </div>
    );
}
