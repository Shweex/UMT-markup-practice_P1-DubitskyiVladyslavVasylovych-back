function getAppUrl() {
  return (process.env.APP_URL || `http://localhost:${process.env.PORT || 3000}`).replace(/\/$/, '');
}

function toPublicPhotoURL(relativePath) {
  if (!relativePath) return relativePath;
  if (/^https?:\/\//i.test(relativePath)) return relativePath;
  return `${getAppUrl()}${relativePath.startsWith('/') ? relativePath : `/${relativePath}`}`;
}

function formatBouquet(bouquet) {
  const data = bouquet.toJSON ? bouquet.toJSON() : bouquet;
  return {
    ...data,
    photoURL: toPublicPhotoURL(data.photoURL),
  };
}

module.exports = { getAppUrl, toPublicPhotoURL, formatBouquet };
