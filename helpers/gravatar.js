const crypto = require('crypto');

function getGravatarUrl(seed) {
  const hash = crypto.createHash('md5').update(String(seed).trim().toLowerCase()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=400`;
}

module.exports = { getGravatarUrl };
