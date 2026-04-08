import Link from 'next/link';
import Poppins from '../ui/Poppins';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white font-semibold">
              NT
            </div>
            <Poppins text="NexTaxi" tag="span" size="18|22" weight="semibold" color="textPrimary" />
          </div>

          <Poppins
            text="Connecting Lanzarote with reliable transport services. Safe, fast, and always available."
            tag="p"
            size="14|16"
            color="textSecondary"
            className="max-w-xs"
          />
        </div>

        <div>
          <Poppins
            text="COMPANY"
            tag="h4"
            size="16|20"
            weight="semibold"
            color="textPrimary"
            className="mb-4 tracking-wide text-center"
          />

          <ul className="space-y-2">
            <li>
              <Link href="/about">
                <Poppins
                  text="About Us"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
            <li>
              <Link href="/careers">
                <Poppins
                  text="Careers"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Poppins
                  text="Contact"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Poppins
            text="SERVICES"
            tag="h4"
            size="16|20"
            weight="semibold"
            color="textPrimary"
            className="mb-4 tracking-wide text-center"
          />

          <ul className="space-y-2">
            <li>
              <Link href="/airport-transfer">
                <Poppins
                  text="Airport Transfer"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
            <li>
              <Link href="/private-tours">
                <Poppins
                  text="Private Tours"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
            <li>
              <Link href="/corporate">
                <Poppins
                  text="Corporate"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Poppins
            text="LEGAL"
            tag="h4"
            size="16|20"
            weight="semibold"
            color="textPrimary"
            className="mb-4 tracking-wide text-center"
          />

          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy">
                <Poppins
                  text="Privacy Policy"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <Poppins
                  text="Terms of Service"
                  size="14|16"
                  color="textSecondary"
                  className="hover:text-[var(--color-primary)] transition text-center"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-[var(--color-border)] pt-6 text-center">
        <Poppins
          text="© 2026 NexTaxi Lanzarote. All rights reserved."
          size="14|16"
          color="textSecondary"
        />
      </div>
    </footer>
  );
}
