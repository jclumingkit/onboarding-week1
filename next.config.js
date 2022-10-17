/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    MOVIE_API: "https://api.themoviedb.org/3",
    API_KEY: "a4499d369742e6fb00ccfa3e3865adf6",
    POSTER_API: "https://image.tmdb.org/t/p/w500",
    IMDB_API: "https://www.imdb.com/title",
  },
};

module.exports = nextConfig;
