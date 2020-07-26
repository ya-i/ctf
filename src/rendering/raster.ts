interface CanvasSize {
  width: number;
  height: number;
}

export function createCanvas({ width, height }: CanvasSize) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;

  return ctx;
}

export function toImageData(dataUri: string, size: number) {
  return new Promise<ImageData>((resolve, reject) => {
    const img = new Image(size, size);

    img.onerror = reject;
    img.onload = function () {
      const ctx = createCanvas(img);

      ctx.drawImage(img, 0, 0);

      resolve(ctx.getImageData(0, 0, img.width, img.height));
    };

    img.src = dataUri;
  });
}
