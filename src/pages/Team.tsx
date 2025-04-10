import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TeamMember } from "@/components/TeamMember";
import { parseTeamMarkdown, fetchMarkdown, getDataPath } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface TeamMemberData {
  id: string;
  imageSrc: string;
  headline: string;
  fullDetails: string;
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberData[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamMembers = async () => {
      setLoading(true);
      try {
        // Get team member IDs (01-25)
        const memberIds = Array.from({ length: 25 }, (_, i) => 
          (i + 1).toString().padStart(2, '0')
        );
        
        const loadedMembers = await Promise.all(
          memberIds.map(async (id) => {
            // Fetch and parse markdown
            const markdownPath = `/src/data/team/${id}.md`;
            const markdownText = await fetchMarkdown(markdownPath);
            const { headline, fullDetails } = parseTeamMarkdown(markdownText);
            
            return {
              id,
              imageSrc: getDataPath(`/src/data/team/${id}.png`),
              headline,
              fullDetails
            };
          })
        );
        
        setTeamMembers(loadedMembers);
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTeamMembers();
  }, []);

  const handleToggleSelect = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) 
        ? prev.filter(memberId => memberId !== id)
        : [...prev, id]
    );
  };

  const handleEnquire = () => {
    if (selectedMembers.length === 0) return;
    
    // Get names of selected team members
    const selectedNames = selectedMembers
      .map(id => {
        const member = teamMembers.find(m => m.id === id);
        return member ? member.headline : "";
      })
      .filter(Boolean)
      .join(", ");
    
    // Redirect to contact page with pre-selected team members
    window.location.href = `/contact?team=${encodeURIComponent(selectedNames)}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Team header */}
      <section className="pt-24 pb-8 bg-secondary/20">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Meet our talented professionals. Click on a team member's photo to select 
            them for your project.
          </p>
          
          {/* Selection controls */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium">
              {selectedMembers.length} team member{selectedMembers.length !== 1 ? 's' : ''} selected
            </span>
            
            <Button 
              onClick={handleEnquire} 
              disabled={selectedMembers.length === 0}
              size="sm"
              className="gap-1"
            >
              <Send className="h-4 w-4" />
              Enquire About Availability
            </Button>
          </div>
        </div>
      </section>
      
      {/* Team grid */}
      <section className="py-12">
        <div className="container">
          {loading ? (
            <div className="text-center py-12">Loading team members...</div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">No team members found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map(member => (
                <TeamMember
                  key={member.id}
                  id={member.id}
                  imageSrc={member.imageSrc}
                  headline={member.headline}
                  fullDetails={member.fullDetails}
                  isSelected={selectedMembers.includes(member.id)}
                  onToggleSelect={() => handleToggleSelect(member.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-muted pt-8">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} The DreamLab UK. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="flex space-x-6">
                <a href="https://bsky.app/profile/thedreamlab.bsky.social" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Bluesky
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
                <a href="https://www.linkedin.com/company/dreamlabinstitute/?" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </div>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team; 