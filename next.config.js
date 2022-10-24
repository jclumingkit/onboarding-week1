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
    SUPABASE_URL: "https://dscypciitbhzkuhedolj.supabase.co",
    SUPABASE_PUBLIC_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzY3lwY2lpdGJoemt1aGVkb2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNDcxMTAsImV4cCI6MTk4MTgyMzExMH0.D546ZSF_uCYyUpuJq937MHwLWTWGyWTz_l6sI4VOt9Q",
  },
};

module.exports = nextConfig;
