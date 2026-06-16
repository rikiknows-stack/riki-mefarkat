// Service Worker מינימלי - נדרש כדי ש-PWA ייחשב תקין ויותקן בלי אזהרות.
// לא מבצע caching אגרסיבי כדי שעדכונים תמיד יופיעו מיד.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// network-first: תמיד מנסה רשת קודם, כך שתמיד מקבלים את הגרסה העדכנית
self.addEventListener('fetch', (event) => {
  // לא נוגעים בקריאות ל-API - שייעברו ישר לרשת
  if (event.request.url.includes('/api/')) return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
