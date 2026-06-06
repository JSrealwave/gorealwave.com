import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Sign in</h1>
          <p className="mt-3 text-base text-slate-400">
            This is a restricted internal system.
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-xl">
          <SignIn
            routing="path"
            path="/login"
            appearance={{
              elements: {
                card: "bg-transparent shadow-none p-0 border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                dividerLine: "bg-white/40",
                dividerText: "bg-white/40 text-white text-sm",
                socialButtonsBlockButton: 
                  "bg-slate-700 border border-slate-600 hover:bg-slate-600 text-white text-base py-2.5",
                socialButtonsProviderIcon: "opacity-90",
                formButtonPrimary: 
                  "bg-white hover:bg-slate-100 text-slate-950 font-semibold text-base py-3",
                formFieldInput: 
                  "bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-base py-3",
                formFieldLabel: "text-sm text-slate-400",
                footerActionText: "text-white text-sm",
                footerActionLink: "text-[#00d4a6] hover:text-[#00b38a] font-medium",
                footer: "hidden", // Hides the default "Secured by Clerk" section
              },
              variables: {
                colorPrimary: "#00d4a6",
                colorText: "#ffffff",
                colorTextSecondary: "#94a3b8",
                colorBackground: "#0f172a",
                colorInputBackground: "#020617",
                colorInputText: "#ffffff",
                borderRadius: "0.75rem",
              }
            }}
          />
        </div>

        {/* Clean Footer */}
        <p className="mt-8 text-center text-base text-slate-400">
          Don&apos;t have an account?{" "}
          <a href="/login/sign-up" className="text-[#00d4a6] hover:text-[#00b38a] font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
