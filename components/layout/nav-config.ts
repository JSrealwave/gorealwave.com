export type NavLink = {
  href: string;
  label: string;
  /** Pathname prefix used for active-state matching */
  matchPath: string;
  /** When set, active only if this search param equals the given value */
  matchSearch?: { key: string; value: string };
  /** When true, active only on exact pathname match */
  exact?: boolean;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", matchPath: "/", exact: true },
  { href: "/library", label: "Library", matchPath: "/library" },
  { href: "/products", label: "Products", matchPath: "/products" },
  { href: "/weekly-brief", label: "Weekly Brief", matchPath: "/weekly-brief" },
];

export function isNavLinkActive(
  link: NavLink,
  pathname: string,
  searchParams: URLSearchParams
): boolean {
  if (link.exact) {
    return pathname === link.matchPath;
  }

  if (!pathname.startsWith(link.matchPath)) {
    return false;
  }

  if (link.matchSearch) {
    return searchParams.get(link.matchSearch.key) === link.matchSearch.value;
  }

  return true;
}
