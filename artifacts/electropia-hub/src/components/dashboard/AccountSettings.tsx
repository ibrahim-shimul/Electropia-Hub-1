import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Camera } from "lucide-react";

export default function AccountSettings() {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const completion = 60;

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-1">Account Settings</h1>
        <p className="text-sm text-slate-500">Manage your profile, verification, and account settings.</p>
      </div>

      {/* Profile Completion */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-heading font-black text-2xl">
              AR
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
              <Camera className="w-3 h-3 text-slate-500" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 mb-0.5">Profile completion</h3>
            <p className="text-sm text-slate-500 mb-2">Profile {completion}% Complete</p>
            <Progress value={completion} className="h-2 mb-1.5 bg-slate-100 [&>div]:bg-[#6c2bd9]" />
            <p className="text-xs text-slate-400">Missing: Date of Birth, Gender</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-0.5">Personal Information</h2>
          <p className="text-sm text-slate-500">Name, phone, email, date of birth, and gender.</p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-sm font-semibold text-slate-700">Name</Label>
          <Input id="name" defaultValue="Arif Rahman" className="border-slate-200" />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone</Label>
          <div className="relative">
            <Input id="phone" defaultValue="01700000004" className="border-slate-200 pr-24" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
          <div className="relative">
            <Input id="email" defaultValue="customer1@electropia.local" className="border-slate-200 pr-28" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
              Unverified
            </span>
          </div>
          <p className="text-xs text-slate-400">Changing email will require verification. We'll send a link to your new address.</p>
          <Button variant="outline" className="w-full border-slate-200 text-slate-700 font-semibold h-10">
            Resend verification email
          </Button>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1.5">
          <Label htmlFor="dob" className="text-sm font-semibold text-slate-700">Date of Birth <span className="text-slate-400 font-normal">(optional)</span></Label>
          <Input
            id="dob"
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="border-slate-200"
          />
        </div>

        {/* Gender */}
        <div className="space-y-1.5">
          <Label htmlFor="gender" className="text-sm font-semibold text-slate-700">Gender <span className="text-slate-400 font-normal">(optional)</span></Label>
          <div className="relative">
            <select
              id="gender"
              value={gender}
              onChange={e => setGender(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-[#6c2bd9] focus:border-[#6c2bd9]"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not">Prefer not to say</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#6c2bd9] hover:bg-[#5821b0] font-bold h-11">Save Changes</Button>
      </div>

      {/* Verification */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-0.5">Verification</h2>
          <p className="text-sm text-slate-500">Verified items add trust to your account.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4" /> Phone Verified
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
            Email Unverified
          </span>
          <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-slate-200 text-slate-700">
            Resend verification email
          </Button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-0.5">Account Settings</h2>
          <p className="text-sm text-slate-500">Change password, two-factor authentication, and account deletion.</p>
        </div>

        <div>
          <Label className="text-sm font-semibold text-slate-700 mb-3 block">Password</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="currentPw" className="text-xs text-slate-500 mb-1 block">Current password</Label>
              <Input id="currentPw" type="password" defaultValue="••••••••" className="border-slate-200" />
            </div>
            <div>
              <Label htmlFor="newPw" className="text-xs text-slate-500 mb-1 block">New password</Label>
              <Input id="newPw" type="password" defaultValue="••••••••" className="border-slate-200" />
            </div>
            <div>
              <Label htmlFor="confirmPw" className="text-xs text-slate-500 mb-1 block">Confirm new password</Label>
              <div className="relative">
                <Input id="confirmPw" type="password" defaultValue="••••••••" className="border-slate-200 pr-28" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6c2bd9] hover:underline whitespace-nowrap">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
