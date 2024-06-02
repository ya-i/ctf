import * as debug from '../../util/debug';

import * as canvas from './canvas';
import * as offscreen from './offscreen';

// TODO https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
// Requires fix to the upstream bug first https://issues.chromium.org/issues/41250699

export function toImageData(dataUri: string, size: number) {
  if (canvas.isSupported) {
    return canvas.render(size, dataUri);
  }

  if (offscreen.isSupported) {
    return offscreen.render(size, dataUri);
  }

  return debug.never('No supported rendering method found');
}
