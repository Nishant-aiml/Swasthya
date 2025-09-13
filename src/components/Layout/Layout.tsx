import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  Search, 
  User, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Find Doctors', href: '/doctor-search', icon: Search },
  { name: 'My Appointments', href: '/appointments', icon: Calendar },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-1 flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Swasthya"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Swasthya</span>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              className="flex items-center w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-6 w-6" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-200">
          <div className="flex items-center">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Swasthya"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">Swasthya</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col h-full">
                <div className="flex-1 py-6 space-y-1">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-3 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={cn(
                            isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 p-4">
                  <Button
                    variant="ghost"
                    className="flex items-center w-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-4 h-6 w-6" />
                    Logout
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Mobile navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <nav className="flex justify-around">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  isActive ? 'text-primary' : 'text-gray-500',
                  'flex flex-col items-center py-2 px-3'
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
