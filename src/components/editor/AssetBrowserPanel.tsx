import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from '@/components/ui/card';
import { Search, Smile, Image as ImageIcon, Type } from 'lucide-react'; // Icons for tabs

// Define props, e.g., for asset categories, search term, selection handler
interface AssetBrowserPanelProps {
  onAssetSelect?: (asset: { type: string; data: any }) => void;
}

const AssetBrowserPanel: React.FC<AssetBrowserPanelProps> = ({ onAssetSelect }) => {
  console.log("Rendering AssetBrowserPanel");

  const handleSelect = (type: string, data: any) => {
    console.log(`Asset selected: ${type}`, data);
    onAssetSelect?.({ type, data });
  };

  // Placeholder data - replace with actual asset fetching and rendering
  const placeholderAssets = (type: string) => Array(10).fill(null).map((_, i) => (
    <Card 
        key={i} 
        className="aspect-square flex items-center justify-center p-2 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleSelect(type, { id: `${type}-${i}`, name: `${type} ${i + 1}`})}
    >
      <CardContent className="p-0 text-center">
        <p className="text-xs text-muted-foreground">{type}</p>
        <p className="text-sm">{i + 1}</p>
      </CardContent>
    </Card>
  ));

  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="icons" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-b-none">
          <TabsTrigger value="icons"><Smile className="w-4 h-4 mr-1 inline-block" />Icons</TabsTrigger>
          <TabsTrigger value="images"><ImageIcon className="w-4 h-4 mr-1 inline-block" />Images</TabsTrigger>
          <TabsTrigger value="fonts"><Type className="w-4 h-4 mr-1 inline-block" />Fonts</TabsTrigger>
        </TabsList>
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search assets..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-grow p-2">
          <TabsContent value="icons" className="mt-0">
            <div className="grid grid-cols-3 gap-2">
              {placeholderAssets("Icon")}
            </div>
          </TabsContent>
          <TabsContent value="images" className="mt-0">
             <div className="grid grid-cols-2 gap-2">
              {placeholderAssets("Image")}
            </div>
          </TabsContent>
          <TabsContent value="fonts" className="mt-0">
            {/* Font previews might be different, e.g., list of text with font styles */}
            {Array(10).fill(null).map((_, i) => (
              <div 
                key={i} 
                className="p-2 my-1 border rounded cursor-pointer hover:bg-accent"
                onClick={() => handleSelect('font', { id: `font-${i}`, name: `Font ${i + 1}`})}
              >
                <span style={{ fontFamily: `Arial, sans-serif` }}>Font Name {i+1}</span> - <span className="text-muted-foreground text-sm">Aa Bb Cc</span>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
export default AssetBrowserPanel;