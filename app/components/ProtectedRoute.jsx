'use client';

import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router])

    if (!user) {
        return <LoaderCircle className='h-[100vh] animate-spin' />
    }

    return children
}