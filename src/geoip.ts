import * as maxmind from '../lib/maxmind/index.mjs';

const MAXMIND_URL = 'https://ctf.pages.dev/maxmind/GeoLite2-Country.mmdb';

class GeoIP {
  private _cache: Promise<Cache> | null = null;
  private _db: maxmind.Reader<maxmind.CountryResponse> | null = null;

  get cache() {
    if (!this._cache) {
      this._cache = caches.open('v1');
    }

    return this._cache;
  }

  async init() {
    const cache = await this.cache;
    const response = await caches.match(MAXMIND_URL);

    this._db = await maxmind.init(response as Response);
  }
}

export default new GeoIP();

export async function init() {
  const cache = await caches.open('v1');

  await cache.addAll([MAXMIND_URL]);

  const response = await caches.match(MAXMIND_URL);

  return maxmind.init(response as Response);
}
