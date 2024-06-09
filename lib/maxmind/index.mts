import type { CountryResponse } from 'mmdb-lib';
import { Reader } from 'mmdb-lib';

export async function init(response: Pick<Response, 'arrayBuffer'>) {
  const db = Buffer.from(await response.arrayBuffer());

  return new Reader<CountryResponse>(db);
}
