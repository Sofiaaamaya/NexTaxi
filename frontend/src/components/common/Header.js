import Link from 'next/link';
import Poppins from '../ui/Poppins';

export default function Header() {
  return (
    <nav className="w-full py-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white font-semibold">
            NT
          </div>
          <Poppins text="NexTaxi" tag="span" size="18|22" weight="semibold" color="textPrimary" />
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">
            <Poppins
              text="Home"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-[var(--color-primary)] transition-colors"
            />
          </Link>

          <Link href="/services">
            <Poppins
              text="Services"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-[var(--color-primary)] transition-colors"
            />
          </Link>

          <Link href="/contact">
            <Poppins
              text="Contact"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-[var(--color-primary)] transition-colors"
            />
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language */}
          <button className="px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-background)] transition">
            <Poppins text="EN" tag="span" size="14|16" color="textPrimary" />
          </button>

          {/* Login */}
          <Link href="/login">
            <Poppins
              text="Login"
              tag="span"
              size="16|20"
              color="textSecondary"
              className="hover:text-[var(--color-primary)] transition-colors"
            />
          </Link>

          {/* Register button */}
          <Link href="/register">
            <button className="px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] transition">
              <Poppins text="Register" tag="span" size="16|20" weight="medium" color="white" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
