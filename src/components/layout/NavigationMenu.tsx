import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus } from 'lucide-react'; // Example icons

// Define props if needed, e.g., for user authentication status
interface NavigationMenuProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isAuthenticated, userName, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen, "isAuthenticated:", isAuthenticated);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/templates", label: "Templates" },
    { href: "/editor", label: "Editor" }, // Link to editor page
    // Add more links as needed
  ];

  return (
    <nav className="bg-background shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center font-bold text-xl text-primary">
              {/* Placeholder for Logo, e.g., <img src="/logo.svg" alt="Logo" className="h-8 w-auto" /> */}
              LogoMaker
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={onLogout}>Logout</Button>
                {userName && <span className="text-sm text-muted-foreground">Hi, {userName}</span>}
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost"><LogIn className="mr-2 h-4 w-4" /> Login</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on state */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground hover:text-primary hover:bg-muted block px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border px-2 space-y-1">
             {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={() => { onLogout?.(); setIsMobileMenuOpen(false); }} className="w-full justify-start">Logout</Button>
                {userName && <span className="block px-3 py-2 text-sm text-muted-foreground">Hi, {userName}</span>}
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start"><LogIn className="mr-2 h-4 w-4" /> Login</Button>
                </Link>
                <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-start"><UserPlus className="mr-2 h-4 w-4" /> Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
export default NavigationMenu;