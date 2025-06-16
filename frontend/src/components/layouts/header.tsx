import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleIcon, Home, LogOut } from 'lucide-react';

import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SETTINGS } from '@/lib/constants';

export default function Header() {
  const user = useSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    useSelector(logOut);
  }
  return (
    <header className="bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-100">
            {SETTINGS.title}
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/pricing"
            className="text-sm font-medium text-gray-100 hover:text-gray-200"
          >
            Pricing
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name ?? ''} />
                  <AvatarFallback>
                    {user.email.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <button type="submit" className="flex w-full" onClick={() => handleLogout()}>
                  <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}