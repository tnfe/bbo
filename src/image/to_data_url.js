const DEFAULT = {
  enabledType: false
};

export default function toDataUrl(url, { enabledType } = DEFAULT) {
  return new Promise((resolve, reject) => {
    try {
      const request = new XMLHttpRequest();
      request.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (enabledType) {
            const image = new Image();
            image.crossOrigin = 'Anonymous';
            image.src = reader.result;
            image.onload = () => {
              resolve(image);
            };
          } else {
            resolve(reader.result);
          }
        };
        reader.readAsDataURL(request.response);
      };
      request.open('GET', url, true);
      request.responseType = 'blob';
      request.send();
    } catch (error) {
      reject(error);
    }
  });
}
