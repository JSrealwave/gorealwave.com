import { SignIn } from "@clerk/nextjs";
import { Lock } from "lucide-react";

const signInAppearance = {
  variables: {
    colorBackground: "transparent",
    colorInputBackground: "#1e293b",
    colorInputText: "#f8fafc",
    colorText: "#f1f5f9",
    colorTextSecondary: "#94a3b8",
    colorPrimary: "#00d4a6",
    colorDanger: "#f87171",
    colorSuccess: "#00d4a6",
    colorNeutral: "#64748b",
    borderRadius: "0.5rem",
    fontFamily: "inherit",
    fontSize: "0.875rem",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-transparent shadow-none p-0 gap-4",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    logoBox: "hidden",
    socialButtons: "gap-2",
    socialButtonsBlockButton:
      "bg-slate-800/80 border border-slate-700 text-slate-100 hover:bg-slate-700 transition-colors",
    socialButtonsBlockButtonText: "font-medium text-sm",
    dividerLine: "bg-slate-700",
    dividerText: "text-slate-500 text-xs",
    formFieldLabel: "text-slate-300 text-sm font-medium",
    formFieldInput:
      "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal/50 focus:ring-teal/20",
    formButtonPrimary:
      "bg-teal hover:bg-teal-dark text-slate-950 font-semibold text-sm shadow-none transition-colors",
    footer: "hidden",
    footerAction: "justify-center",
    footerActionText: "text-slate-500 text-sm",
    footerActionLink: "text-teal hover:text-teal-dark font-medium",
    identityPreview: "bg-slate-800 border-slate-700",
    identityPreviewText: "text-slate-200",
    identityPreviewEditButton: "text-teal hover:text-teal-dark",
    formFieldInputShowPasswordButton: "text-slate-400 hover:text-slate-200",
    otpCodeFieldInput: "border-slate-700 bg-slate-800 text-white",
    alternativeMethodsBlockButton:
      "border-slate-700 text-slate-300 hover:bg-slate-800",
    formResendCodeLink: "text-teal hover:text-teal-dark",
    backLink: "text-slate-400 hover:text-slate-200",
    badge: "bg-slate-800 border-slate-700 text-slate-300",
  },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-12 sm:px-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,212,166,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative w-full max-w-[26rem]">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy shadow-sm ring-1 ring-white/5">
              <span className="text-2xl font-bold tracking-tighter text-white">
                e+
              </span>
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold leading-tight tracking-tight text-white">
                Realwave
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Enablement Hub
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-slate-400">
            <Lock className="h-3 w-3 text-teal/80" aria-hidden />
            Internal system — authorized access only
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-8">
          <div className="mb-6 border-b border-slate-800/80 pb-6 text-center">
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Sign in
            </h1>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
              Use your company credentials to access seller enablement tools
              and content.
            </p>
          </div>

          <SignIn
            appearance={signInAppearance}
            routing="path"
            path="/login"
          />
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-600">
          Restricted internal platform. Activity may be monitored. If you do not
          have access, contact your administrator.
        </p>
      </div>
    </div>
  );
}
