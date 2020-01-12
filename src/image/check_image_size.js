/**
 * Check image size
 * @param {(Object|String)} image - image information，allow File Object or Data URLs
 * @param {Object} [options={}] - Check options
 * @param {Number} [options.width] - Check width
 * @param {Number} [options.height] - Check height
 * @param {Number} [deviation=0] - Allowable deviation
 */

const checkImageSize = (image, options, deviation = 0) => {
  return new Promise((resolve, reject) => {
    /**
     * Check type of image
     */
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = function() {
        checkSize(this.result);
      };
      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      checkSize(image);
    }

    /**
     * Check picture size
     * @param {String} data：Data URL
     */
    function checkSize(data) {
      const virtualImage = new Image();
      virtualImage.src = data;
      virtualImage.onload = function() {
        let width = this.naturalWidth;
        let height = this.naturalHeight;
        if (options.width && Math.abs(options.width - width) > deviation) {
          resolve(false);
        }
        if (options.height && Math.abs(options.height - height) > deviation) {
          resolve(false);
        }
        resolve(true);
      };
    }
  });
};

export default checkImageSize;
