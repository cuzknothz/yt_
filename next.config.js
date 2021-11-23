/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: [
      "i.ytimg.com",
      "https://i.ytimg.com",
      "lh3.googleusercontent.com",
      "yt3.ggpht.com",
      "picsum.photos",
    ],
  },
};
