import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import workshopList from '@/data/workshop-list.json';
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
              <span className="font-bold text-xl tracking-tight">DREAMLAB</span>
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
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Workshops</span>
                {/* ChevronRight removed, shadcn/ui provides its own */}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-52"> {/* Adjusted width */}
                {workshopList.length > 0 ? (
                  workshopList.map(workshop => (
                    <DropdownMenuItem key={workshop.id} asChild>
                      <Link to={workshop.path} className="w-full">{workshop.name}</Link>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No workshops available</DropdownMenuItem>
                )}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/work" className="w-full">Previous Work</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/contact" className="w-full">Contact</Link>
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
