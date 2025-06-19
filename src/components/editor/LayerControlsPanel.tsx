import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash2, ArrowUp, ArrowDown, Copy, Lock, Unlock } from 'lucide-react';

// Define props, e.g., for layers data, selection, reordering handlers
interface Layer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape';
  isVisible: boolean;
  isLocked: boolean;
}

interface LayerControlsPanelProps {
  layers: Layer[];
  selectedLayerId?: string | null;
  onLayerSelect?: (id: string) => void;
  onVisibilityToggle?: (id: string) => void;
  onLockToggle?: (id: string) => void;
  onDeleteLayer?: (id: string) => void;
  onReorderLayer?: (id: string, direction: 'up' | 'down') => void;
  onDuplicateLayer?: (id: string) => void;
}

const LayerControlsPanel: React.FC<LayerControlsPanelProps> = ({
  layers = [], // Default to empty array
  selectedLayerId,
  onLayerSelect,
  onVisibilityToggle,
  onLockToggle,
  onDeleteLayer,
  onReorderLayer,
  onDuplicateLayer,
}) => {
  console.log("Rendering LayerControlsPanel with", layers.length, "layers. Selected:", selectedLayerId);

  // Placeholder layers if none provided
  const displayLayers = layers.length > 0 ? layers : [
    { id: '1', name: 'Background Shape', type: 'shape', isVisible: true, isLocked: false },
    { id: '2', name: 'Company Name', type: 'text', isVisible: true, isLocked: false },
    { id: '3', name: 'Logo Icon', type: 'image', isVisible: false, isLocked: true },
  ];


  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-md">Layers</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent className="p-0">
          {displayLayers.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No layers yet.</div>
          ) : (
            <ul className="divide-y divide-border">
              {displayLayers.map((layer, index) => (
                <li
                  key={layer.id}
                  onClick={() => onLayerSelect?.(layer.id)}
                  className={`flex items-center justify-between p-2 hover:bg-accent cursor-pointer ${selectedLayerId === layer.id ? 'bg-accent' : ''}`}
                >
                  <span className="text-sm truncate flex-grow" title={layer.name}>{layer.name} ({layer.type})</span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onLockToggle?.(layer.id); }} title={layer.isLocked ? "Unlock Layer" : "Lock Layer"}>
                      {layer.isLocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onVisibilityToggle?.(layer.id); }} title={layer.isVisible ? "Hide Layer" : "Show Layer"}>
                      {layer.isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </ScrollArea>
      {selectedLayerId && (
        <div className="p-2 border-t flex flex-wrap gap-1 justify-center">
            <Button variant="outline" size="xs" onClick={() => onReorderLayer?.(selectedLayerId, 'up')} title="Move Up"><ArrowUp className="h-3 w-3 mr-1"/> Up</Button>
            <Button variant="outline" size="xs" onClick={() => onReorderLayer?.(selectedLayerId, 'down')} title="Move Down"><ArrowDown className="h-3 w-3 mr-1"/> Down</Button>
            <Button variant="outline" size="xs" onClick={() => onDuplicateLayer?.(selectedLayerId)} title="Duplicate"><Copy className="h-3 w-3 mr-1"/> Dup</Button>
            <Button variant="destructive" size="xs" onClick={() => onDeleteLayer?.(selectedLayerId)} title="Delete"><Trash2 className="h-3 w-3 mr-1"/> Del</Button>
        </div>
      )}
    </Card>
  );
}
export default LayerControlsPanel;