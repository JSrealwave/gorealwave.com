import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Access Restricted
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Please sign in to continue.
          </p>
        </div>

        <SignIn 
          appearance={{
            elements: {
              card: "bg-slate-900 border border-slate-700",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
            }
          }}
        />
      </div>
    </div>
  );
}
