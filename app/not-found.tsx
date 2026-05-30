"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = window.location.pathname

    return (
        <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
            <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
            <p className="mt-4 text-lg">
                The page <span className="font-semibold">{pathname}</span> could not be
                found.
            </p>

            <div dangerouslySetInnerHTML={{ __html: pathname }} />

            <Link
                href="/"
                className="mt-8 rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
            >
                Go back home
            </Link>
        </main>
    );
}
