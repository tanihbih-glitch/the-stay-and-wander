import { Link } from "wouter";
import { Instagram, Heart, Music } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/manus-storage/logo-compass_7d46aa77.png"
                alt="The Stay & Wander"
                className="w-6 h-6"
              />
              <span className="font-display text-lg font-bold text-gray-900">
                The Stay & Wander
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Discover beautiful places, unique stays & unforgettable journeys.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/itineraries" className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline">
                  Itineraries
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline">
                  Travel Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  Destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  Affiliate Disclosure
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors no-underline"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">
              Get travel tips and exclusive deals delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <a
                href="https://us10.list-manage.com/subscribe?u=48ee0dc10117e46d5a5e32365&id=4512b2fda5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap w-full">
                  Subscribe
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              © 2026 The Stay & Wander. All rights reserved. The Stay & Wander
              earns a small commission when you book through our links, at no
              extra cost to you.
            </p>
            <div className="flex gap-6 text-xs">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors no-underline"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors no-underline"
              >
                Terms & Conditions
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors no-underline"
              >
                Affiliate Disclosure
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
