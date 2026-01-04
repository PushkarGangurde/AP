import type { NextConfig } from "next";
import path from "node:path";

// Loader path from orchids-visual-edits - use direct resolve to get the actual file
let loaderPath: string | null = null;
try {
  loaderPath = require.resolve('orchids-visual-edits/loader.js');
} catch (e) {
  console.warn('orchids-visual-edits loader not found, skipping turbopack loader');
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  ...(loaderPath && {
    turbopack: {
      rules: {
        "*.{jsx,tsx}": {
          loaders: [loaderPath]
        }
      }
    }
  })
} as NextConfig;

export default nextConfig;
