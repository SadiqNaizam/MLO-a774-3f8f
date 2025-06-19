import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import CustomSidebar from '@/components/layout/Sidebar'; // Renamed to avoid conflict
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Edit, Download, Trash2, PlusCircle, MoreHorizontal, BarChart3, FileText, Users, Settings, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavedLogo {
  id: string;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  status: 'Draft' | 'Completed';
}

const mockUserLogos: SavedLogo[] = [
  { id: 'logo123', name: 'My Awesome Startup', lastModified: '2024-07-15', thumbnailUrl: 'https://picsum.photos/seed/logo123/100/100', status: 'Completed' },
  { id: 'logo456', name: 'Cool Beans Cafe', lastModified: '2024-07-12', thumbnailUrl: 'https://picsum.photos/seed/logo456/100/100', status: 'Draft' },
  { id: 'logo789', name: 'Tech Innovators Inc.', lastModified: '2024-06-28', thumbnailUrl: 'https://picsum.photos/seed/logo789/100/100', status: 'Completed' },
];

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');
  const [userLogos, setUserLogos] = useState<SavedLogo[]>(mockUserLogos);
  const userName = "Alex Johnson"; // Placeholder user name

  const handleDeleteLogo = (logoId: string) => {
    setUserLogos(prevLogos => prevLogos.filter(logo => logo.id !== logoId));
    console.log(`Logo ${logoId} deleted.`);
    // Here you would also call an API to delete on the server
  };
  
  const sidebarNavItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/my-logos", label: "My Logos", icon: Edit }, // Assuming this page focuses on My Logos
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/billing", label: "Billing", icon: FileText },
    { href: "/dashboard/team", label: "Team Management", icon: Users },
    { href: "/dashboard/settings", label: "Account Settings", icon: Settings },
  ];


  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu isAuthenticated={true} userName={userName} onLogout={() => console.log('User logged out')} />
      <div className="flex flex-1">
        <CustomSidebar navItems={sidebarNavItems} />
        <main className="flex-1 p-6 md:p-10 bg-muted/30 overflow-y-auto">
          <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome, {userName}!</h1>
              <p className="text-muted-foreground">Manage your logos and account details.</p>
            </div>
            <div className="flex items-center mt-4 sm:mt-0">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=50&q=60" alt={userName} />
                <AvatarFallback>{userName.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Link to="/editor">
                <Button><PlusCircle className="mr-2 h-5 w-5" /> Create New Logo</Button>
              </Link>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Logos</CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userLogos.length}</div>
                <p className="text-xs text-muted-foreground">You have {userLogos.length} saved designs.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Designs</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userLogos.filter(l => l.status === 'Completed').length}</div>
                <p className="text-xs text-muted-foreground">Ready for download and use.</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Pro Plan</div> {/* Placeholder */}
                <p className="text-xs text-muted-foreground">Next billing: 2024-08-01</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>My Saved Logos</CardTitle>
              <CardDescription>View, edit, or download your creations.</CardDescription>
            </CardHeader>
            <CardContent>
              {userLogos.length > 0 ? (
                <Table>
                  <TableCaption>A list of your saved logo designs.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Preview</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userLogos.map((logo) => (
                      <TableRow key={logo.id}>
                        <TableCell>
                          <Avatar className="h-10 w-10 rounded-md">
                            <AvatarImage src={logo.thumbnailUrl} alt={logo.name} />
                            <AvatarFallback>{logo.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{logo.name}</TableCell>
                        <TableCell>{logo.lastModified}</TableCell>
                        <TableCell>
                           <span className={`px-2 py-1 text-xs rounded-full ${logo.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {logo.status}
                           </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => console.log(`Edit ${logo.id}`)}>
                                <Link to={`/editor?logoId=${logo.id}`} className="flex items-center w-full">
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => console.log(`Download ${logo.id}`)}>
                                <Download className="mr-2 h-4 w-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                           {/* AlertDialog for delete confirmation, needs to be outside DropdownMenu logic to control its open state independently if complex scenarios, or tied to a state variable */}
                           <AlertDialog>
                             <AlertDialogContent> {/* This Trigger should be handled by the DropdownMenuItem click */}
                               <AlertDialogHeader>
                                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                 <AlertDialogDescription>
                                   This action cannot be undone. This will permanently delete "{logo.name}".
                                 </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                 <AlertDialogCancel>Cancel</AlertDialogCancel>
                                 <AlertDialogAction onClick={() => handleDeleteLogo(logo.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                               </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                 <div className="text-center py-10">
                    <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">No Logos Yet</h3>
                    <p className="text-muted-foreground mt-1 mb-4">Start creating your first logo design!</p>
                    <Link to="/editor">
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Create a New Logo</Button>
                    </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardPage;