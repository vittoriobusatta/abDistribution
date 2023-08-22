/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        options.defaultLoaders.babel,
        { loader: "@graphql-tools/webpack-loader" },
      ],
    });

    return config;
  },
  images: {
    domains: ["cdn.shopify.com"],
  },
};

module.exports = nextConfig;
