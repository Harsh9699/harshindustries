"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!auth) throw new Error("Firebase Auth is not initialized.");
      
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-margin-mobile">
      <div className="w-full max-w-[450px] bg-surface border brutalist-border p-xl rounded-none shadow-2xl">
        <div className="text-center mb-xl">
          <h1 className="font-headline-md text-headline-md text-primary mb-xs">Secure Access</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Harsh Industries Admin Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-lg">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Email</label>
            <input 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-dim border brutalist-border rounded-none text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]" 
              placeholder="admin@harshindustries.com" 
              type="email" 
            />
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">Password</label>
            <input 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-dim border brutalist-border rounded-none text-on-surface font-body-md px-md py-sm focus:border-primary focus:ring-0 transition-colors h-[48px]" 
              placeholder="••••••••" 
              type="password" 
            />
          </div>
          
          {error && <p className="text-error font-body-sm bg-error-container/20 p-xs border border-error">{error}</p>}
          
          <button 
            disabled={loading}
            className="btn-primary font-label-caps text-label-caps px-lg py-md h-[48px] w-full hover:opacity-90 transition-opacity mt-sm disabled:opacity-50" 
            type="submit"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
