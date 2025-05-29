export const getAssetPath = (path: string): string => {
  // Remove any leading slashes to prevent double slashes
  const cleanPath = path.replace(/^\/+/, '');
  
  // Check if we're running on GitHub Pages by looking at the hostname
  const isGitHubPages = typeof window !== 'undefined' && 
    (window.location.hostname.includes('github.io') || process.env.GITHUB_PAGES);
  
  // For GitHub Pages, we need the repo name in the path
  const basePath = isGitHubPages ? '/detroit/' : '/';
  
  // Don't include 'public' in the path as Next.js serves from the public directory directly
  const finalPath = cleanPath.replace(/^public\//, '');
  
  // Combine and ensure no double slashes
  return `${basePath}${finalPath}`;
}; 