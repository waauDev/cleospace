import Link from "next/link";
import { ReactNode } from "react";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import { LogOut } from "lucide-react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <nav className="nameplate justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="size-8 text-text" />
          <h2 className="text-2xl!">CleoSpace</h2>
        </Link>
        <div className="flex items-center gap-3">
          <div className="screen flex items-center gap-2 py-1">
            <span className="nameplate-led" />
            <span className="digits digits--green text-xs">READY</span>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="key-icon"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <LogOut className="size-4" />
            </button>
          </form>
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
