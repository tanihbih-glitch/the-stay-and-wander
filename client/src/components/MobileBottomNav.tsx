import { Link, useLocation } from "wouter";
import { Home, Search, MapPin, BookOpen } from "lucide-react";

export default function MobileBottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/booking" },
    { icon: MapPin, label: "Itineraries", href: "/itineraries" },
    { icon: BookOpen, label: "Blog", href: "/blog" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = location === href;
          return (
            <Link key={href} href={href}>
              <a
                className={`flex flex-col items-center justify-center w-full h-full gap-1 no-underline transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
