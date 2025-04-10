import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from 'fs';
import { componentTagger } from "lovable-tagger";

// Helper function to copy special files
function copySpecialFiles() {
  return {
    name: 'copy-special-files',
    closeBundle() {
      // Ensure .nojekyll and CNAME files are copied to the build output
      if (fs.existsSync('.nojekyll')) fs.copyFileSync('.nojekyll', 'dist/.nojekyll');
      if (fs.existsSync('CNAME')) fs.copyFileSync('CNAME', 'dist/CNAME');
      
      // Copy the data directory to the build output
      copyDataDirectory('src/data', 'dist/data');
    }
  };
}

// Helper function to recursively copy a directory
function copyDataDirectory(source: string, destination: string) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  // Get all files in the source directory
  const files = fs.readdirSync(source);
  
  // Copy each file to the destination directory
  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    // If directory, recursively copy its contents
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDataDirectory(sourcePath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: { outDir: 'dist' }, // Build to the dist folder for GitHub Pages
  base: '/', // Base to root for custom domain
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    copySpecialFiles(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
