"use client";

import { useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import { Camera, Check } from "lucide-react";

const TABS = ["Personal Info", "Address", "Password"] as const;

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Personal Info");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AccountLayout title="Profile" subtitle="Manage your personal information and account settings.">
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 text-3xl font-bold text-ink">
              M
            </div>
            <button
              aria-label="Change photo"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white shadow-sm transition-transform hover:scale-105"
            >
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-ink">MD. Masud Rana</p>
            <p className="text-sm text-gray-500">masud@example.com</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b border-gray-100">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-3 pb-3 text-sm font-medium transition-colors ${
                tab === t ? "text-ink" : "text-gray-400 hover:text-ink"
              }`}
            >
              {t}
              {tab === t && <span className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand" />}
            </button>
          ))}
        </div>

        {/* Panels */}
        <form onSubmit={handleSave} className="mt-6 animate-fade-slide" key={tab}>
          {tab === "Personal Info" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" defaultValue="MD. Masud Rana" />
              <Field label="Email address" type="email" defaultValue="masud@example.com" />
              <Field label="Phone number" defaultValue="+880 1XXX-XXXXXX" />
              <Field label="Date of birth" type="date" />
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-gray-500">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Tell us a little about yourself"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
            </div>
          )}

          {tab === "Address" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Street address" className="sm:col-span-2" placeholder="House, road, area" />
              <Field label="City" placeholder="Dhaka" />
              <Field label="Postal code" placeholder="1207" />
              <Field label="Country" placeholder="Bangladesh" />
              <Field label="Phone" placeholder="+880 1XXX-XXXXXX" />
            </div>
          )}

          {tab === "Password" && (
            <div className="grid gap-4 sm:max-w-sm">
              <Field label="Current password" type="password" />
              <Field label="New password" type="password" />
              <Field label="Confirm new password" type="password" />
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              Save changes
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                <Check size={15} /> Saved
              </span>
            )}
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}

function Field({
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-ink"
      />
    </div>
  );
}