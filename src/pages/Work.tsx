import { Header } from "@/components/Header";

const Work = () => {
  // Sample previous work data
  const previousWorks = [
    {
      id: "work-1",
      title: "Interactive Art Installation",
      client: "National Gallery",
      year: "2023",
      description: "An immersive digital experience that transforms classic paintings into interactive elements that respond to visitor movement.",
      imageUrl: "https://placehold.co/600x400/1a1a2e/ffffff?text=Art+Installation"
    },
    {
      id: "work-2",
      title: "VR Training Platform",
      client: "Medical Research Institute",
      year: "2022",
      description: "A virtual reality platform for medical students to practice surgical procedures in a risk-free environment.",
      imageUrl: "https://placehold.co/600x400/1a1a2e/ffffff?text=VR+Training"
    },
    {
      id: "work-3",
      title: "Interactive Data Visualization",
      client: "Climate Research Center",
      year: "2022",
      description: "A real-time data visualization dashboard that helps researchers understand complex climate patterns.",
      imageUrl: "https://placehold.co/600x400/1a1a2e/ffffff?text=Data+Visualization"
    },
    {
      id: "work-4",
      title: "AR Educational App",
      client: "National Science Museum",
      year: "2021",
      description: "An augmented reality application that brings scientific concepts to life for museum visitors.",
      imageUrl: "https://placehold.co/600x400/1a1a2e/ffffff?text=AR+Education"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Work header */}
      <section className="pt-24 pb-8 bg-secondary/20">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Previous Work</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore our portfolio of innovative projects and collaborations.
          </p>
        </div>
      </section>
      
      {/* Work showcase */}
      <section className="py-12">
        <div className="container">
          <div className="space-y-16">
            {previousWorks.map((work) => (
              <div 
                key={work.id} 
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className={`rounded-lg overflow-hidden ${work.id.endsWith('2') || work.id.endsWith('4') ? 'md:order-2' : ''}`}>
                  <img 
                    src={work.imageUrl} 
                    alt={work.title} 
                    className="w-full h-auto" 
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{work.title}</h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span>{work.client}</span>
                    <span className="mx-2">•</span>
                    <span>{work.year}</span>
                  </div>
                  <p className="text-base">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
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

export default Work; 