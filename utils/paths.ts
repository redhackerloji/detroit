export const getAssetPath = (path: string): string => {
  const basePath = process.env.GITHUB_PAGES ? '/detroit' : '';
  return `${basePath}${path}`;
}; 