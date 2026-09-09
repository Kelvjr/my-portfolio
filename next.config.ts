import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/Kelvin%20Kwasi%20Kyere.pdf",
        destination: "/media/documents/cv.pdf",
        permanent: true,
      },
    ];
  },
};
export default config;
