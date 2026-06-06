import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: { absolute: "Sign in" },
  description: "Sign in to access the internal portal.",
  robots: {
    index: false,
    follow: false,
  },
};

const signInAppearance = {
  variables: {
    colorBackground: "transparent",
    colorInputBackground: "#020617",
    colorInputText: "#f8fafc",
    colorText: "#f1f5f9",
    colorTextSecondary: "#94a3b8",
    colorTextOnPrimaryBackground: "#020617",
    colorPrimary: "#00d4a6",
    colorDanger: "#f87171",
    colorSuccess: "#00d4a6",
    colorWarning: "#00d4a6",
    colorNeutral: "#64748b",
    colorShimmer: "#334155",
    borderRadius: "0.625rem",
    fontFamily: "inherit",
    fontSize: "1rem",
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  elements: {
    rootBox: "w-full",
    card: "bg-transparent shadow-none p-0 gap-6",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    logoBox: "hidden",
    main: "gap-6",
    socialButtons: "gap-3",
    socialButtonsBlockButton:
      "h-11 bg-slate-800/90 border border-slate-700 text-slate-100 hover:bg-slate-700 transition-colors",
    socialButtonsBlockButtonText: "font-medium text-base",
    dividerLine: "bg-slate-700/80",
    dividerText: "text-slate-500 text-sm",
    formFieldLabel: "text-slate-200 text-base font-medium",
    formFieldInput:
      "h-11 text-base bg-slate-950 border-slate-700 text-white placeholder:text-slate-500 focus:border-[#00d4a6]/50 focus:ring-1 focus:ring-[#00d4a6]/25",
    formButtonPrimary:
      "h-11 bg-[#00d4a6] hover:bg-[#00b892] text-slate-950 font-semibold text-base shadow-none transition-colors",
    footer: "hidden",
    footerAction: "justify-center pt-2",
    footerActionText: "text-slate-400 text-base",
    footerActionLink:
      "text-[#00d4a6] hover:text-[#00b892] font-medium text-base",
    identityPreview: "bg-slate-950 border-slate-700",
    identityPreviewText: "text-slate-200 text-base",
    identityPreviewEditButton: "text-[#00d4a6] hover:text-[#00b892] text-base",
    formFieldInputShowPasswordButton:
      "text-slate-400 hover:text-slate-200 text-base",
    otpCodeFieldInput:
      "border-slate-700 bg-slate-950 text-white text-base h-11",
    alternativeMethodsBlockButton:
      "h-11 border-slate-700 text-slate-300 hover:bg-slate-800 text-base",
    formResendCodeLink: "text-[#00d4a6] hover:text-[#00b892] text-base",
    backLink: "text-slate-400 hover:text-slate-200 text-base",
    badge: "bg-slate-800 border-slate-700 text-slate-300 text-sm",
    alertText: "text-slate-300 text-base",
    formFieldAction: "text-[#00d4a6] hover:text-[#00b892] text-base",
    formFieldHintText: "text-slate-400 text-sm",
    formHeaderTitle: "text-white text-lg font-semibold",
    formHeaderSubtitle: "text-slate-400 text-base",
    phoneInputBox: "border-slate-700 bg-slate-950",
    selectButton:
      "h-11 border-slate-700 bg-slate-950 text-white text-base hover:bg-slate-900",
    selectOptions:
      "border-slate-700 bg-slate-900 text-white text-base",
    selectOption: "text-base hover:bg-slate-800",
    spinner: "text-[#00d4a6]",
    formFieldSuccessText: "text-[#00d4a6] text-sm",
    formFieldErrorText: "text-red-400 text-sm",
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <header className="shrink-0 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-5 sm:px-8">
          <p className="text-base font-medium text-slate-300">
            Internal access portal
          </p>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7 shadow-2xl shadow-black/30 sm:p-9">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Sign in
              </h1>
              <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-slate-400">
                Enter your credentials to access this restricted internal
                system.
              </p>
            </div>

            <SignIn
              appearance={signInAppearance}
              routing="path"
              path="/login"
            />
          </div>
        </div>
      </main>

      <footer className="shrink-0 border-t border-slate-800 px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-lg text-center text-sm leading-relaxed text-slate-500">
          This is a restricted internal system. Unauthorized access is
          prohibited.
        </p>
      </footer>
    </div>
  );
}
