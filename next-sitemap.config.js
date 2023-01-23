/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.ab-distribution.re/",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
};
