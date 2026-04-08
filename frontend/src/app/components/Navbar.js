"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? "bg-black/50 backdrop-blur-xl border-white/5" : "bg-transparent border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
              HireX AI
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/upload" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Analyze Request
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/upload" className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md text-sm font-medium transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
