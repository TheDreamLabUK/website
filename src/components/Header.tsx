import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Renders the fixed website header.
 * Features a logo/title with dropdown menu and a contact button.
 * Changes appearance on scroll for better visibility.
 */
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <span className="font-bold text-xl tracking-tight">CLICK FOR MORE</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem asChild>
              <Link to="/" className="w-full">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/team" className="w-full">Team</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/contact" className="w-full">Contact</Link>
            </DropdownMenuItem>
            <div className="py-1">
              <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
              <div className="px-3 py-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Affiliate Partners</div>
            </div>
            <DropdownMenuItem asChild>
              <a href="https://dreamlab-ai.com" target="_blank" rel="noopener noreferrer" className="w-full">DreamLab AI Consulting</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="https://agenticalliance.com/" target="_blank" rel="noopener noreferrer" className="w-full">Agentic Alliance</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" asChild>
          <a href="mailto:info@thedreamlab.uk">Contact</a>
        </Button>
      </div>
    </header>
  );
};
