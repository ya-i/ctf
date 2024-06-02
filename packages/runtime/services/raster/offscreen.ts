// Chrome-only API for now

const PATH = 'offscreen.html';

export const isSupported =
  typeof chrome !== 'undefined' && chrome.offscreen !== undefined;

export async function render(size: number, dataUri: string) {
  await setupOffscreenDocument();

  const rasterBin = (await chrome.runtime.sendMessage({
    target: 'offscreen',
    type: 'render',
    data: { size, dataUri },
  })) as string;

  const uint8Array = stringToUint8ClampedArray(rasterBin);

  return new ImageData(uint8Array, size);
}

function stringToUint8ClampedArray(str: string) {
  const array = new Uint8ClampedArray(str.length);
  for (let i = 0; i < str.length; i++) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

let creating: Promise<unknown> | null = null;

async function setupOffscreenDocument() {
  // Check all windows controlled by the service worker to see if one
  // of them is the offscreen document with the given path
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(PATH)],
  });

  if (existingContexts.length > 0) {
    return;
  }

  // create offscreen document
  if (!creating) {
    creating = chrome.offscreen.createDocument({
      url: PATH,
      reasons: ['BLOBS'],
      justification: 'https://issues.chromium.org/issues/41250699',
    });
  }

  await creating;
  creating = null;
}
