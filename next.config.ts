import type {
  NextConfig,
} from "next";

const nextConfig: NextConfig =
  {
    images: {
      remotePatterns: [
        {
          protocol:
            "https",
          hostname:
            "ojkyqdvpsncniiogesai.supabase.co",
        },
      ],
    },
  };

export default nextConfig;