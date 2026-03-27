"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

import { getLocalizedAdminHref, persistAuthSession } from "@/lib/auth/session";
import { loginAdmin } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await loginAdmin({
        email: email.trim(),
        password,
        role: "admin",
      });

      persistAuthSession(response.data, rememberMe);
      window.location.assign(getLocalizedAdminHref());
      return;
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError || error instanceof Error
          ? error.message
          : "Unable to sign in right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-orange-500 via-[#ff5a1f] to-[#ff7a00] lg:flex">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_30%)]" />

          <div className="relative flex w-full items-center justify-center p-10">
            <div className="relative h-full w-full max-w-3xl">
              <div className="absolute left-0 top-8 w-[340px] rotate-[-12deg] rounded-[36px] bg-white/90 p-5 shadow-2xl backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-lg font-semibold text-zinc-800">
                    Performance
                  </div>
                  <div className="text-zinc-400">...</div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    "bg-emerald-400",
                    "bg-emerald-200",
                    "bg-amber-300",
                    "bg-orange-500",
                    "bg-zinc-100",
                    "bg-amber-200",
                    "bg-rose-100",
                    "bg-orange-100",
                  ].map((color, index) => (
                    <div key={index} className={`h-16 rounded-2xl ${color}`} />
                  ))}
                </div>
              </div>

              <div className="absolute right-16 top-10 w-[300px] rotate-[8deg] rounded-[32px] bg-white/90 p-5 shadow-2xl backdrop-blur">
                <div className="mb-2 text-lg font-semibold text-zinc-800">
                  New Income
                </div>
                <div className="text-5xl font-bold text-zinc-900">
                  $40,832.32
                </div>
                <div className="mt-3 text-sm text-emerald-600">
                  +13.6% from last month
                </div>
              </div>

              <div className="absolute bottom-10 left-10 w-[360px] rotate-[6deg] rounded-[36px] bg-white/90 p-5 shadow-2xl backdrop-blur">
                <div className="mb-2 text-lg font-semibold text-zinc-800">
                  Orders
                </div>
                <div className="text-5xl font-bold text-zinc-900">3259</div>
                <div className="mt-3 text-sm text-emerald-600">
                  +6.22% this week
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[36px] bg-white/40 p-5 shadow-2xl backdrop-blur">
                <Image
                  src="/images/logo.png"
                  alt="Coupony Logo"
                  width={500}
                  height={500}
                  priority
                />
              </div>

              <div className="absolute bottom-20 right-8 rounded-[28px] bg-white p-6 shadow-2xl">
                <Image
                  src="/images/auth-visual.svg"
                  alt="Admin dashboard placeholder visual"
                  width={180}
                  height={180}
                  priority
                />
              </div>

              <div className="absolute left-6 top-6 text-3xl font-bold text-white">
                Coupony Admin
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[460px] rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-10">
            <div className="mb-10">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                Admin Portal
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
                Sign in
              </h1>
              <p className="mt-3 text-sm text-zinc-500">
                Use your admin email and password to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-14 w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-14 w-full rounded-full border border-zinc-200 bg-zinc-50 px-5 pr-14 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
                    required
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-3 text-sm text-zinc-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 accent-orange-500"
                />
                Remember me
              </label>

              {errorMessage ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-full bg-orange-500 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
