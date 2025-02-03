// components/AuthProvider.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/validate-token", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Token invalid");
        }
      } catch (error) {
        router.push("/login");
      }
    };

    // Check immediately on mount
    checkTokenValidity();

    // Set up periodic checks (every 30 seconds)
    const interval = setInterval(checkTokenValidity, 30000);

    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
}
