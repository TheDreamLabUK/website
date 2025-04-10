import { useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface TeamMemberProps {
  id: string;
  imageSrc: string;
  headline: string;
  fullDetails: string;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export const TeamMember = ({ 
  id, 
  imageSrc, 
  headline, 
  fullDetails, 
  isSelected, 
  onToggleSelect 
}: TeamMemberProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Split the full details into paragraphs
  const paragraphs = fullDetails.split('\n\n').filter(p => p.trim() !== '');

  return (
    <div 
      className="relative overflow-hidden rounded-lg bg-background shadow-md transition-all hover:shadow-lg"
      onClick={(e) => {
        // Only toggle selection when clicking on the image
        if (e.target === e.currentTarget.querySelector('img')) {
          onToggleSelect();
        }
      }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-20 rounded-full bg-primary p-1">
          <Check className="h-4 w-4 text-primary-foreground" />
        </div>
      )}

      {/* Team member image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageSrc}
          alt={headline}
          className={`h-full w-full object-cover transition-opacity ${isSelected ? 'opacity-90' : 'opacity-100'} cursor-pointer`}
        />
      </div>

      {/* Team member headline */}
      <div className="p-4">
        <h3 className="text-lg font-medium">{headline}</h3>
        
        {/* Expandable details */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button 
              className="mt-2 flex items-center text-sm text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              Details
              {popoverOpen ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 max-h-80 overflow-y-auto p-4"
            onInteractOutside={() => setPopoverOpen(false)}
          >
            <div className="space-y-2 text-sm">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}; 