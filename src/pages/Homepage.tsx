import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CustomCarousel from '@/components/Carousel'; // Renamed to avoid conflict with shadcn
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Palette, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  console.log('Homepage loaded');

  const carouselSlides = [
    <div className="text-center p-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
      <img src="https://images.unsplash.com/photo-1553531384-411a247ccd73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3QlMjBsb2dvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Abstract Logo" className="mx-auto h-40 w-auto object-contain mb-4 rounded-md"/>
      <h3 className="text-2xl font-semibold">Modern & Sleek Designs</h3>
      <p className="mt-2">Create logos that stand out.</p>
    </div>,
    <div className="text-center p-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg text-white">
      <img src="https://images.unsplash.com/photo-1609967098838-994054659343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmludGFnZSUyMGxvZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Vintage Logo" className="mx-auto h-40 w-auto object-contain mb-4 rounded-md"/>
      <h3 className="text-2xl font-semibold">Timeless & Classic Styles</h3>
      <p className="mt-2">Craft logos with a vintage touch.</p>
    </div>,
    <div className="text-center p-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg text-white">
      <img src="https://images.unsplash.com/photo-1611162616805-7926338bcb6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1pbmltYWxpc3QlMjBsb2dvfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Minimalist Logo" className="mx-auto h-40 w-auto object-contain mb-4 rounded-md"/>
      <h3 className="text-2xl font-semibold">Minimalist & Impactful</h3>
      <p className="mt-2">Less is more with our clean designs.</p>
    </div>,
  ];

  const features = [
    {
      icon: <Edit3 className="h-10 w-10 text-primary mb-4" />,
      title: "Intuitive Editor",
      description: "Easily customize every aspect of your logo with our user-friendly drag-and-drop editor.",
    },
    {
      icon: <Palette className="h-10 w-10 text-primary mb-4" />,
      title: "Vast Asset Library",
      description: "Choose from thousands of icons, fonts, and color palettes to make your logo unique.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary mb-4" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for designs, colors, and layouts based on your industry.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu isAuthenticated={false} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <Label htmlFor="cta-button" className="text-sm font-semibold uppercase text-primary tracking-wider">Your Vision, Your Logo</Label>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-foreground">
              Create Your Professional Logo in Minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Unleash your brand's potential with our powerful and easy-to-use logo maker. No design skills required.
            </p>
            <Link to="/editor">
              <Button size="lg" id="cta-button" className="text-lg px-10 py-6">
                Start Designing Your Logo
              </Button>
            </Link>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Inspiring Designs</h2>
            <p className="text-muted-foreground text-center mb-10">See what you can create with LogoMaker.</p>
            <CustomCarousel slides={carouselSlides} options={{ loop: true }} showArrows={true} showDots={true} />
          </div>
        </section>

        <Separator className="my-16 container" />

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose LogoMaker?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center items-center">{feature.icon}</div>
                    <CardTitle className="mt-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20 text-center bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6">Ready to Bring Your Brand to Life?</h2>
                <p className="text-lg mb-8 max-w-xl mx-auto">
                    Join thousands of satisfied users who created their perfect logo with us.
                </p>
                <Link to="/templates">
                     <Button size="lg" variant="secondary" className="text-lg px-10 py-6">
                        Explore Templates
                    </Button>
                </Link>
            </div>
        </section>
      </main>

      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LogoMaker Inc. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="text-sm hover:underline mx-2">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:underline mx-2">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;