export const getURL = () => {
  const url =
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000';
  return url.includes('http') ? url : `https://${url}`;
};

export const getWebhookStatusCallback = () =>
  process.env.NODE_ENV === 'development' ? '' : `${getURL()}/api/webhooks`;

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const isMobile = (() => {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.userAgent !== 'string'
  ) {
    return false;
  }
  return /Mobile/.test(navigator.userAgent);
})();

export const trackpubsToTracks = (trackMap) =>
  Array.from(trackMap.values())
    .map((publication) => publication.track)
    .filter((track) => track !== null);
