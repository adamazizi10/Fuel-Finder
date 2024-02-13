/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
          },
          {
              protocol: 'https',
              hostname: 'plus.unsplash.com',
          },
          {
            protocol: 'https',
            hostname: 'www.google.com',
        },
        {
          protocol: 'https',
          hostname: 's.yimg.com'
        },
        {
          protocol: 'https',
          hostname: 'content.api.news'
        },
        {
          protocol: 'https',
          hostname: 'www.scienceabc.com'
        },
        {
          protocol: 'https',
          hostname: 'cdn.create.vista.com'
        },
         // {
        //   protocol: 'https',
        //   hostname: 'cdn.create.vista.com'
        // },
         // {
        //   protocol: 'https',
        //   hostname: 'cdn.create.vista.com'
        // },
        
      ],
  },
};

export default nextConfig;
