import * as interceptors from '../../interceptors';
import { Report } from '../../lib/report';
import { Request, RequestParameters } from '../../lib/request';

export async function collect(payload: RequestParameters) {
  const request = await Request.fromWebRequest(payload);

  const traceroute = await interceptors.run(request);

  return new Report(request, traceroute);
}
