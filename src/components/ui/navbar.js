'use client';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import  {Moon , Sun}  from 'lucide-react'
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-500 dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            <div>
                <h1 className='text-lg font-semibold hover:text-blue-600'>HR Dashboard</h1>
            </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-semibold hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/analytics"  className="text-lg font-semibold hover:text-blue-600">
              Analytics
            </Link>
            <Link href="/bookmarks" className=" text-lg font-semibold hover:text-blue-600">
              Bookmarks
            </Link>
            <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Theme"
          >
           {theme ==='dark' ? (
              <Sun size={22} className="text-yellow-400" />
            ) : (
              <Moon size={22} className="text-gray-700" />
            )}
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
