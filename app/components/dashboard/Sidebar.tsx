'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/app/lib/auth-context';
import type { SidebarProps } from '@/app/lib/types';

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Transactions', href: '/transactions', icon: '💳' },
    { name: 'My Wallets', href: '/wallets', icon: '👛' },
    { name: 'Policies', href: '/policies', icon: '📋' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Help', href: '/help', icon: '❓' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[#1a1a2e] text-white transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image
                src="/assets/images/Logo.svg"
                alt="Fintech Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold">Fintech</span>
            </Link>
            {/* Close button for mobile */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-[#C8EE44] text-gray-900 font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                )}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section and Logout */}
          <div className="border-t border-gray-700 p-4 space-y-2">
            {/* User profile */}
            <div className="flex items-center space-x-3 px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-[#C8EE44] flex items-center justify-center text-gray-900 font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={signOut}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <span className="text-xl">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
