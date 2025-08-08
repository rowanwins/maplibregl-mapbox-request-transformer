export function isMapboxURL(url) {
  return url.indexOf('mapbox:') === 0;
}

export function transformMapboxStyle (_previousStyle, nextStyle) {
  if (nextStyle.projection && nextStyle.projection.name) {
      delete nextStyle.projection.name;
  }
  return nextStyle;
}

export function transformMapboxUrl (url, resourceType, accessToken) {
  if (url.indexOf('/styles/') > -1 && url.indexOf('/sprite') === -1) return {url: normalizeStyleURL(url, accessToken)}
  if (url.indexOf('/sprites/') > -1) return {url: normalizeSpriteURL(url, '', '.json', accessToken)}
  if (url.indexOf('/fonts/') > -1) return {url: normalizeGlyphsURL(url, accessToken)}
  if (url.indexOf('/v4/') > -1) return {url: normalizeSourceURL(url, accessToken)}
  if (resourceType && resourceType === 'Source') return {url: normalizeSourceURL(url, accessToken)}
}

function parseUrl(url) {
    const urlRe = /^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;
    const parts = url.match(urlRe);
    if (!parts) {
        throw new Error('Unable to parse URL object');
    }
    return {
        protocol: parts[1],
        authority: parts[2],
        path: parts[3] || '/',
        params: parts[4] ? parts[4].split('&') : []
    };
}

function formatUrl(urlObject, accessToken) {
  const apiUrlObject = parseUrl("https://api.mapbox.com");
  urlObject.protocol = apiUrlObject.protocol;
  urlObject.authority = apiUrlObject.authority;
  urlObject.params.push(`access_token=${accessToken}`);
  const params = urlObject.params.length ? `?${urlObject.params.join('&')}` : '';
  return `${urlObject.protocol}://${urlObject.authority}${urlObject.path}${params}`;
}

function normalizeStyleURL(url, accessToken) {
  const urlObject = parseUrl(url);
  urlObject.path = `/styles/v1${urlObject.path}`;
  return formatUrl(urlObject, accessToken);
}

function normalizeGlyphsURL(url, accessToken) {
  const urlObject = parseUrl(url);
  urlObject.path = `/fonts/v1${urlObject.path}`;
  return formatUrl(urlObject, accessToken);
}

function normalizeSourceURL(url, accessToken) {
  const urlObject = parseUrl(url);
  urlObject.path = `/v4/${urlObject.authority}.json`;
  urlObject.params.push('secure');
  return formatUrl(urlObject, accessToken);
}

/**
 * Normalizes a sprite URL.
 *
 * @param {string} url - The original sprite URL.
 * @param {string} _format - The format (not used in the function).
 * @param {string} _extension - The extension (not used in the function).
 * @param {string} accessToken - The access token.
 *
 * @returns {string} - The normalized URL.
 *
 * @throws {Error} Throws an error if the URL cannot be normalized.
 */
function normalizeSpriteURL(url, _format, _extension, accessToken) {
  const urlObject = parseUrl(url);
  let path = urlObject.path.split('.');
  let properPath = path[0]
  const extension = path[1] || 'json'; // <- this only line is changed
  let format = ''

  if (properPath.indexOf('@2x')) {
    properPath = properPath.split('@2x')[0];
    format = '@2x'
  }
  urlObject.path = `/styles/v1${properPath}/sprite${format}.${extension}`;
  return formatUrl(urlObject, accessToken);
}
