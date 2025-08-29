/**
 * Environment utilities shared across the web app.
 */
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;
export const nodeEnv = process.env.NODE_ENV;

/**
 * Guard helper to execute code only in the browser.
 */
export const isBrowser = typeof window !== 'undefined';
