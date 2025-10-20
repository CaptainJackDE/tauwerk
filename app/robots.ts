import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tauwerk.de";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/events/builder", "/events/editor"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
