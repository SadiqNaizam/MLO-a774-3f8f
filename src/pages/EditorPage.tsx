import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import InteractiveLogoCanvas from '@/components/editor/InteractiveLogoCanvas';
import DesignToolBar from '@/components/editor/DesignToolBar';
import AssetBrowserPanel from '@/components/editor/AssetBrowserPanel';
import LayerControlsPanel, { Layer } from '@/components/editor/LayerControlsPanel';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { TooltipProvider } from "@/components/ui/tooltip"; // DesignToolBar uses Tooltip

const EditorPage = () => {
  console.log('EditorPage loaded');
  
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'Background Shape', type: 'shape', isVisible: true, isLocked: false },
    { id: '2', name: 'Company Slogan', type: 'text', isVisible: true, isLocked: false },
    { id: '3', name: 'Main Icon', type: 'image', isVisible: true, isLocked: false },
  ]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState<string>('#ffffff');

  const handleToolSelect = (tool: string) => console.log(`Tool selected: ${tool}`);
  const handleDownload = () => console.log('Download action triggered');
  const handlePreview = () => console.log('Preview action triggered');
  const handleSave = () => console.log('Save action triggered');
  const handleAssetSelect = (asset: { type: string; data: any }) => console.log('Asset selected:', asset);
  
  const handleLayerSelect = (id: string) => setSelectedLayerId(id);
  const handleVisibilityToggle = (id: string) => setLayers(prev => prev.map(l => l.id === id ? {...l, isVisible: !l.isVisible} : l));
  const handleLockToggle = (id: string) => setLayers(prev => prev.map(l => l.id === id ? {...l, isLocked: !l.isLocked} : l));
  const handleDeleteLayer = (id: string) => setLayers(prev => prev.filter(l => l.id !== id));
  const handleDuplicateLayer = (id: string) => {
    const layerToDuplicate = layers.find(l => l.id === id);
    if (layerToDuplicate) {
      const newLayer = { ...layerToDuplicate, id: Date.now().toString(), name: `${layerToDuplicate.name} (Copy)` };
      setLayers(prev => [...prev, newLayer]);
    }
  };
  const handleReorderLayer = (id: string, direction: 'up' | 'down') => {
    // Simplified reorder logic, actual implementation would be more robust
    console.log(`Reorder layer ${id} ${direction}`);
    const index = layers.findIndex(l => l.id === id);
    if (index === -1) return;
    const newLayers = [...layers];
    const item = newLayers.splice(index, 1)[0];
    if (direction === 'up' && index > 0) {
      newLayers.splice(index - 1, 0, item);
    } else if (direction === 'down' && index < newLayers.length) {
      newLayers.splice(index + 1, 0, item);
    } else {
      // Cannot move further, put it back
       newLayers.splice(index, 0, item);
    }
    setLayers(newLayers);
  };


  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-muted/40">
        <NavigationMenu isAuthenticated={true} userName="Designer" />
        
        <DesignToolBar 
          onToolSelect={handleToolSelect}
          onDownload={handleDownload}
          onPreview={handlePreview}
          onSave={handleSave}
        />

        <ResizablePanelGroup direction="horizontal" className="flex-grow p-2 gap-2">
          {/* Left Panel: Assets & Layers */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ResizablePanelGroup direction="vertical" className="h-full gap-2">
              <ResizablePanel defaultSize={50} minSize={30}>
                <AssetBrowserPanel onAssetSelect={handleAssetSelect} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30}>
                <LayerControlsPanel 
                  layers={layers}
                  selectedLayerId={selectedLayerId}
                  onLayerSelect={handleLayerSelect}
                  onVisibilityToggle={handleVisibilityToggle}
                  onLockToggle={handleLockToggle}
                  onDeleteLayer={handleDeleteLayer}
                  onReorderLayer={handleReorderLayer}
                  onDuplicateLayer={handleDuplicateLayer}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle withHandle />

          {/* Center Panel: Canvas */}
          <ResizablePanel defaultSize={60} minSize={40}>
            <div className="bg-background rounded-md shadow-sm h-full flex items-center justify-center p-4 overflow-auto">
              <InteractiveLogoCanvas templateId="new-project" backgroundColor={canvasBackgroundColor} width={400} height={400}/>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel: Properties/Inspector */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="bg-card rounded-md shadow-sm h-full p-4 flex flex-col gap-4 overflow-y-auto">
              <h3 className="text-lg font-semibold border-b pb-2">Properties</h3>
              {selectedLayerId ? (
                <div>
                  <Label htmlFor="layerName">Layer Name</Label>
                  <Input id="layerName" defaultValue={layers.find(l => l.id === selectedLayerId)?.name} className="mt-1 mb-3" />
                  
                  <Label htmlFor="opacity">Opacity</Label>
                  <Slider defaultValue={[100]} max={100} step={1} className="my-2" />

                  <Label htmlFor="bgColor">Canvas Color</Label>
                  <Input type="color" id="bgColor" value={canvasBackgroundColor} onChange={(e) => setCanvasBackgroundColor(e.target.value)} className="mt-1 mb-3 w-full" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Select a layer to see its properties.</p>
              )}

              <Tabs defaultValue="element" className="mt-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="element">Element</TabsTrigger>
                  <TabsTrigger value="canvas">Canvas</TabsTrigger>
                </TabsList>
                <TabsContent value="element" className="p-1 text-sm text-muted-foreground">
                  Specific element properties will show here.
                </TabsContent>
                <TabsContent value="canvas" className="p-1">
                  <Label htmlFor="canvasWidth">Width (px)</Label>
                  <Input id="canvasWidth" type="number" defaultValue={400} className="mt-1 mb-2" />
                  <Label htmlFor="canvasHeight">Height (px)</Label>
                  <Input id="canvasHeight" type="number" defaultValue={400} className="mt-1" />
                </TabsContent>
              </Tabs>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4 w-full">More Options</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Advanced Settings</DialogTitle>
                    <DialogDescription>
                      Configure advanced options for your logo design.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Export Format" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                        <SelectItem value="jpg">JPG</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="mt-2 w-full">Help & Tips</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Quick Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Use Shift + Click to select multiple layers. Right-click for context menu.
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
};

export default EditorPage;