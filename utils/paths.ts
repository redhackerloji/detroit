export const getAssetPath = (path: string): string => {
  // Remove any leading slashes to prevent double slashes
  const cleanPath = path.replace(/^\/+/, '');
  // For GitHub Pages, we need the repo name in the path
  const basePath = process.env.GITHUB_PAGES ? '/detroit/' : '/';
  // Combine and ensure no double slashes
  return `${basePath}${cleanPath}`;
}; 