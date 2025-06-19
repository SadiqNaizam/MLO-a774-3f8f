import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Search, Tag, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Template {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  tags: string[];
  style: string;
}

const mockTemplates: Template[] = Array.from({ length: 25 }, (_, i) => ({
  id: `template-${i + 1}`,
  name: `Creative Logo ${i + 1}`,
  imageUrl: `https://picsum.photos/seed/${i+1}logo/400/300`, // Placeholder image
  category: i % 3 === 0 ? 'Technology' : i % 3 === 1 ? 'Business' : 'Lifestyle',
  tags: ['modern', 'minimalist', i % 2 === 0 ? 'bold' : 'elegant'],
  style: i % 2 === 0 ? 'Abstract' : 'Typographic',
}));

const TemplatesGalleryPage = () => {
  console.log('TemplatesGalleryPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredTemplates = mockTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || template.category === selectedCategory) &&
    (selectedStyle === 'all' || template.style === selectedStyle)
  );

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const paginatedTemplates = filteredTemplates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const categories = ['all', 'Technology', 'Business', 'Lifestyle', 'Art & Design', 'Food & Drink'];
  const styles = ['all', 'Abstract', 'Typographic', 'Iconic', 'Vintage', 'Geometric'];

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu isAuthenticated={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground">Explore Logo Templates</h1>
          <p className="text-lg text-muted-foreground mt-2">Find the perfect starting point for your brand.</p>
        </header>

        {/* Filters Section */}
        <Card className="mb-8 p-4 sm:p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search templates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-base"
              />
            </div>
            <div>
              <Label htmlFor="category-filter" className="text-sm font-medium text-muted-foreground mb-1 flex items-center"><Briefcase className="w-4 h-4 mr-2"/>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter" className="py-3 text-base">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="style-filter" className="text-sm font-medium text-muted-foreground mb-1 flex items-center"><Tag className="w-4 h-4 mr-2"/>Style</Label>
              <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                <SelectTrigger id="style-filter" className="py-3 text-base">
                  <SelectValue placeholder="Filter by style" />
                </SelectTrigger>
                <SelectContent>
                   {styles.map(style => <SelectItem key={style} value={style}>{style === 'all' ? 'All Styles' : style}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Templates Grid */}
        {paginatedTemplates.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-380px)] pr-3"> {/* Adjust height as needed */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTemplates.map(template => (
                <Card key={template.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
                  <CardHeader className="p-0">
                    <img src={template.imageUrl} alt={template.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Category: {template.category} | Style: {template.style}
                    </CardDescription>
                    <div className="mt-2">
                      {template.tags.map(tag => (
                        <span key={tag} className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full mr-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                    <Link to={`/editor?template=${template.id}`} className="w-full">
                      <Button className="w-full">Customize Template</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-muted-foreground">No Templates Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter criteria.</p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1);}} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                 <PaginationItem key={i}>
                   <PaginationLink 
                     href="#" 
                     onClick={(e) => { e.preventDefault(); handlePageChange(i + 1);}}
                     isActive={currentPage === i + 1}
                   >
                     {i + 1}
                   </PaginationLink>
                 </PaginationItem>
              ))}
              {/* Consider adding PaginationEllipsis if many pages */}
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1);}} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
       <footer className="py-6 bg-background border-t mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} LogoMaker Templates. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TemplatesGalleryPage;