/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 90, 95, 100],
  },
}

export default nextConfig
