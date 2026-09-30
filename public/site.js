(() => {
  const config = window.SITE_CONFIG || {};
  const safeUrl = (value, protocols) => {
    try { const url = new URL(value); return protocols.includes(url.protocol) ? url.href : ''; }
    catch { return ''; }
  };
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '') ? `mailto:${config.email}` : '';
  const viber = safeUrl(config.viberUrl, ['https:', 'viber:']);
  for (const link of document.querySelectorAll('[data-contact]')) {
    const href = link.dataset.contact === 'email' ? email : viber;
    if (href) { link.href = href; link.removeAttribute('aria-disabled'); }
  }
  if (config.address) document.querySelector('#address').textContent = config.address;
  if (config.closingCopy) document.querySelector('#closing-copy').textContent = config.closingCopy;
  if (config.locationSideBySideOnMobile) document.querySelector('.location-row').style.gridTemplateColumns = 'repeat(2,minmax(0,1fr))';
  const mapsUrl = safeUrl(config.mapsUrl, ['https:']);
  if (mapsUrl) {
    const address = document.querySelector('#address');
    const link = document.createElement('a');
    link.href = mapsUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.textContent = config.address || 'Open in Google Maps';
    address.replaceChildren(link);
  }
  const embedUrl = safeUrl(config.mapEmbedUrl, ['https:']);
  if (embedUrl && /(^|\.)google\.(com|com\.ph)$/.test(new URL(embedUrl).hostname)) {
    const map = document.createElement('iframe');
    map.src = embedUrl; map.title = '5D Storage location map'; map.loading = 'lazy';
    map.referrerPolicy = 'no-referrer-when-downgrade'; map.allowFullscreen = true;
    document.querySelector('#map-panel').replaceChildren(map);
  }
  const siteUrl = safeUrl(config.siteUrl, ['https:']);
  if (siteUrl) { const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = siteUrl; document.head.append(canonical); }
})();
