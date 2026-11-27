/**
 * Vercel Web Analytics Integration
 * 
 * This module initializes Vercel Web Analytics for tracking page views
 * and user interactions on the site.
 * 
 * Uses esm.sh CDN to load @vercel/analytics without requiring node_modules
 */

import { inject } from 'https://esm.sh/@vercel/analytics@1.4.1';

// Initialize Vercel Analytics
inject({
  mode: 'production',
  debug: false
});
