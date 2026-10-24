'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: "Today's Rates" },
    { href: '/petrol-price-in-pakistan', label: 'Petrol' },
    { href: '/diesel-price-in-pakistan', label: 'Diesel' },
    { href: '/petrol-price-history', label: 'History' },
    { href: '/fuel-price-changes', label: 'Changes' },
    { href: '/petrol-calculator', label: 'Calculator' },
    { href: '/petrol-price-by-city', label: 'By City' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top verified bar */}
      <div className="bg-emerald-900 dark:bg-emerald-950 text-emerald-100 text-xs py-1.5 px-4 font-semibold tracking-wide border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white">Official OGRA &amp; Petroleum Division verified rates for Pakistan</span>
          </div>
          <div className="flex items-center gap-2.5 text-emerald-200 text-xs font-medium">
            <span>October 2026 Notification</span>
            <span className="text-emerald-500">|</span>
            <Link href="/methodology" className="hover:text-white underline decoration-emerald-400/50">
              Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo brand */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-all">
                <span>PK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl text-slate-950 dark:text-white tracking-tight leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                  Petrol Price Pakistan
                </span>
                <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 tracking-wider uppercase leading-none">
                  Official Consumer Rates
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/petrol-calculator"
              className="hidden xl:inline-flex items-center justify-center px-3 py-1.5 border border-emerald-600/30 dark:border-emerald-500/30 text-xs font-black rounded-lg text-emerald-900 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition"
            >
              Fill-Up Tool
            </Link>

            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-1 animate-fadeIn">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/petrol-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-3 py-2.5 rounded-lg text-sm font-black text-white bg-emerald-700 hover:bg-emerald-800 shadow-xs transition"
              >
                Tank Fill-Up Calculator
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
