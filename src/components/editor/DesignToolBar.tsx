import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bold, Italic, Underline, Palette, Text, ImageIcon, Shapes, Download, Eye, Save } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


// Props could include selected element type, callbacks for actions
interface DesignToolBarProps {
  onToolSelect?: (tool: string) => void;
  onDownload?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
  // Add more props for specific tool states, e.g., current font, color
}

const DesignToolBar: React.FC<DesignToolBarProps> = ({ onToolSelect, onDownload, onPreview, onSave }) => {
  console.log("Rendering DesignToolBar");

  const tools = [
    { id: 'text', icon: Text, label: 'Add Text' },
    { id: 'image', icon: ImageIcon, label: 'Add Image' },
    { id: 'shape', icon: Shapes, label: 'Add Shape' },
    { id: 'color', icon: Palette, label: 'Color Picker' },
  ];

  const textFormattingTools = [
    { id: 'bold', icon: Bold, label: 'Bold' },
    { id: 'italic', icon: Italic, label: 'Italic' },
    { id: 'underline', icon: Underline, label: 'Underline' },
  ];
  
  const actionButtons = [
    { id: 'save', icon: Save, label: 'Save Design', action: onSave },
    { id: 'preview', icon: Eye, label: 'Preview', action: onPreview },
    { id: 'download', icon: Download, label: 'Download', action: onDownload },
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <div className="bg-card p-2 border rounded-lg shadow flex flex-wrap items-center gap-1 md:gap-2">
        {/* Primary Tools */}
        {tools.map(tool => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => onToolSelect?.(tool.id)} aria-label={tool.label}>
                <tool.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>{tool.label}</p></TooltipContent>
          </Tooltip>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1 md:mx-2" />

        {/* Contextual Tools (e.g., for text) - show/hide based on selection */}
        {textFormattingTools.map(tool => (
          <Tooltip key={tool.id}>
            <TooltipTrigger asChild>
               <Button variant="ghost" size="icon" onClick={() => onToolSelect?.(tool.id)} aria-label={tool.label}>
                <tool.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>{tool.label}</p></TooltipContent>
          </Tooltip>
        ))}
        
        <div className="flex-grow"/> {/* Pushes action buttons to the right */}

        {/* Action Buttons */}
        {actionButtons.map(btn => (
          btn.action && (
            <Tooltip key={btn.id}>
              <TooltipTrigger asChild>
                <Button variant={btn.id === 'download' ? 'default' : 'outline'} size="sm" onClick={btn.action} aria-label={btn.label}>
                  <btn.icon className="h-4 w-4 mr-0 md:mr-2" />
                  <span className="hidden md:inline">{btn.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>{btn.label}</p></TooltipContent>
            </Tooltip>
          )
        ))}
      </div>
    </TooltipProvider>
  );
}
export default DesignToolBar;