'use client';

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute({ children }) {
    const { user, initializingAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user && !initializingAuth) { // user and initializingAuth are both false only when user unauthenticated
            router.push('/login');
        }
    }, [user, initializingAuth, router])

    if (initializingAuth) {
        return <LoaderCircle className='h-[100vh] animate-spin' />
    }

    if (!user) {
        return null;
    }

    return children
}