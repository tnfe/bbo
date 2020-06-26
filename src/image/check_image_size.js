/**
 * Check image size
 * @param {(Object|String)} image - image information，allow File Object or Data URLs
 * @param {Object} [options={}] - Check options
 */

import isString from '../lodash/is_string';

const DEFAULT = {
  enabledMaxSize: false,
  enabledNatural: false,
  ratio: 1
};

const checkImageSize = (image, { enabledMaxSize, enabledNatural, ratio } = DEFAULT) => {
  return new Promise((resolve, reject) => {
    /**
     * Check type of image
     */
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        checkSize(reader.result);
      };
      reader.readAsDataURL(image);
    } else if (isString(image)) {
      checkSize(image);
    }

    /**
     * Check picture size
     * @param {String} data：Data URL
     */
    function checkSize(url) {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        let w = image.width / ratio;
        let h = image.height / ratio;

        if (enabledMaxSize) {
          let nw = Math.min(w, 750 / 2);
          h = h * (nw / w);
          w = nw;
        }

        if (enabledNatural) {
          w = image.naturalWidth / ratio;
          h = image.naturalHeight / ratio;
        }

        w = w >> 0;
        h = h >> 0;

        resolve({ width: w, height: h });
      };
      image.onerror = (e) => {
        reject(e);
      };
    }
  });
};

export default checkImageSize;
