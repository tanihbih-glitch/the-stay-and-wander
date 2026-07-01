import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Itineraries", href: "/itineraries" },
    { label: "Booking", href: "/booking" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <img
            src="/manus-storage/logo-compass_7d46aa77.png"
            alt="The Stay & Wander"
            className="w-8 h-8"
          />
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-gray-900">
              The Stay & Wander
            </span>
            <span className="text-xs font-light text-gray-600 tracking-widest">
              DISCOVER · STAY · EXPLORE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline">
              {link.label}
            </Link>
          ))}
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Start Planning
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-900" />
          ) : (
            <Menu className="w-6 h-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Start Planning
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
