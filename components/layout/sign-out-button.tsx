export function SignOutButton() {
  return (
    <form action="/api/sign-out" method="post">
      <button
        type="submit"
        className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-navy dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
      >
        Sign out
      </button>
    </form>
  );
}
