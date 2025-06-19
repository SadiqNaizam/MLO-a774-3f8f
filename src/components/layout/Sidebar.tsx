import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Home, Settings, BarChart3, Users, ShoppingBag, FileText } from 'lucide-react'; // Example icons

// Define props if the sidebar content is dynamic or has sections
interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType; // Lucide icon component
}

interface SidebarProps {
  navItems?: NavItem[]; // Allow custom nav items
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Home },
  { href: "/dashboard/projects", label: "My Logos", icon: ShoppingBag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Billing", icon: FileText },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];


const Sidebar: React.FC<SidebarProps> = ({ navItems = defaultNavItems, className = "" }) => {
  const location = useLocation();
  console.log("Rendering Sidebar. Current path:", location.pathname);

  return (
    <aside className={`w-60 bg-card border-r border-border hidden md:flex flex-col ${className}`}>
      <div className="p-4 border-b">
        {/* Optional: Logo or App Name specific to dashboard */}
        <h2 className="text-lg font-semibold text-primary">Dashboard</h2>
      </div>
      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname.startsWith(item.href) // More robust active check
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <Separator />
      <div className="p-4 text-xs text-muted-foreground">
        {/* Optional: Footer content like version or help link */}
        &copy; {new Date().getFullYear()} LogoMaker Inc.
      </div>
    </aside>
  );
}
export default Sidebar;