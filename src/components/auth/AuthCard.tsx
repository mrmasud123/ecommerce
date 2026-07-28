"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import AuthVisual from "./AuthVisual";

type Mode = "login" | "signup";

export default function AuthCard({ initialMode = "login" }: { initialMode?: Mode }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function switchTo(next: Mode) {
    setMode(next);
    router.push(`/${next}`, { scroll: false });
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AuthVisual />

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <a href="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-black text-white">
              M
            </span>
            <span className="text-lg font-extrabold text-ink">Mcommerce</span>
          </a>

          {/* Sliding tab switcher */}
          <div className="relative mb-8 grid grid-cols-2 rounded-full bg-gray-100 p-1">
            <span
              className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-300 ease-out ${
                mode === "signup" ? "translate-x-[calc(100%+8px)]" : "translate-x-0"
              }`}
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => switchTo("login")}
              className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === "login" ? "text-white" : "text-gray-500 hover:text-ink"
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => switchTo("signup")}
              className={`relative z-10 rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === "signup" ? "text-white" : "text-gray-500 hover:text-ink"
              }`}
            >
              Sign up
            </button>
          </div>

          <div key={mode} className="animate-fade-slide">
            <h2 className="text-2xl font-extrabold text-ink">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {mode === "login"
                ? "Log in to pick up right where you left off."
                : "Join Sellzy and start saving on everyday essentials."}
            </p>

            <form className="mt-6 space-y-4">
              {mode === "signup" && (
                <Field icon={User} type="text" placeholder="Full name" autoComplete="name" />
              )}

              <Field icon={Mail} type="email" placeholder="Email address" autoComplete="email" />

              <div className="relative">
                <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm outline-none transition-colors focus:border-ink"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {mode === "login" ? (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-500">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-ink focus:ring-ink" />
                    Remember me
                  </label>
                  <a href="#" className="font-medium text-ink hover:underline">
                    Forgot password?
                  </a>
                </div>
              ) : (
                <label className="flex items-start gap-2 text-sm text-gray-500">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 text-ink focus:ring-ink" />
                  I agree to the{" "}
                  <a href="#" className="font-medium text-ink hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-ink hover:underline">
                    Privacy Policy
                  </a>
                </label>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-white transition-transform hover:bg-ink/90 active:scale-[0.98]"
              >
                {mode === "login" ? "Log in" : "Create account"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">or continue with</span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <SocialButton provider="google" />
                <SocialButton provider="facebook" />
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              {mode === "login" ? "New to MCommerce?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => switchTo(mode === "login" ? "signup" : "login")}
                className="font-semibold text-ink hover:underline"
              >
                {mode === "login" ? "Create an account" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="relative">
      <Icon size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        {...props}
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function SocialButton({ provider }: { provider: "google" | "facebook" }) {
    const config = {
      google: {
        label: "Google",
        icon: <GoogleIcon />,
        ring: "hover:border-[#4285F4]/50 hover:bg-[#4285F4]/[0.04]",
      },
      facebook: {
        label: "Facebook",
        icon: <FacebookIcon />,
        ring: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/[0.04]",
      },
    }[provider];
  
    return (
      <button
        type="button"
        className={`group relative flex items-center justify-center gap-2.5 rounded-full border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.15)] active:translate-y-0 active:scale-[0.97] active:shadow-none ${config.ring}`}
      >
        <span className="transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95">
          {config.icon}
        </span>
        <span className="transition-colors duration-300 group-hover:text-ink">
          {config.label}
        </span>
      </button>
    );
  }
  
  function GoogleIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#4285F4"
          d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        />
        <path
          fill="#34A853"
          d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        />
        <path
          fill="#FBBC05"
          d="M3.964 10.706A5.41 5.41 0 0 1 3.68 9c0-.593.102-1.17.284-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
        />
        <path
          fill="#EA4335"
          d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
        />
      </svg>
    );
  }
  
  function FacebookIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#1877F2"
          d="M18 9c0-4.97-4.03-9-9-9S0 4.03 0 9c0 4.492 3.29 8.215 7.594 8.89v-6.29H5.309V9h2.285V7.017c0-2.256 1.343-3.502 3.4-3.502.985 0 2.014.176 2.014.176v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.6h-2.097v6.29C14.71 17.215 18 13.492 18 9z"
        />
      </svg>
    );
  }