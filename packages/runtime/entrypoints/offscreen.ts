import * as canvas from '../services/raster/canvas';
import * as debug from '../util/debug';

debug.intro();

type M =
  | undefined
  | null
  | { target: string; type: undefined }
  | {
      target: 'offscreen';
      type: 'render';
      data: { size: number; dataUri: string };
    };

chrome.runtime.onMessage.addListener((request: M, sender, sendResponse) => {
  if (!request || request.target !== 'offscreen') {
    return;
  }

  switch (request.type) {
    case 'render':
      void canvas
        .render(request.data.size, request.data.dataUri)
        .then(imageDataToStr)
        .then(sendResponse);

      return true;

    default:
      debug.never(`Unexpected request type "${request.type}"`);
  }
});

function imageDataToStr(imageData: ImageData) {
  return String.fromCharCode.apply(null, imageData.data as unknown as number[]);
}
