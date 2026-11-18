import { config } from 'dotenv';
config({ path: '.env' });

export default {
  site: process.env.BASE_URL,

  scanner: {
    sitemap: false,
    robotsTxt: false,
    device: process.env.DEVICE,
    headers: {
      Cookie: '' //Please update relevant cookie in case authentication is required
    },
  },

  urls: [
    '/',
    '/culture/',
    '/solutions/ai-transformation/',
    '/careers/',
    '/insights/',
    '/about-us/',
  ],

  ci: {
    budget: {
      'performance': 90,
      'accessibility': 90,
      'best-practices': 90,
      'seo': 90,
    },
  },
}
