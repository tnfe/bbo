/**
 * Image optimization
 * Gif images are not supported
 * @param {(Object|String)} - image ,supported File Object or Data URLs
 * @param {Number} [quality = 0.9] - Image quality, between 0 - 1, only image/jpeg or image/webp is accept.
 * @param {Object} [options = {}] - Image options
 * @param {Number} [options.maxWidth = 1920] - The maximum width of the output picture.
 * If the original width of the picture is less than this width, the original size picture is returned.
 * If the original width of the picture is greater than the width, the picture scaled to the size is returned.
 * @param {String} [options.mimeType] - Output image type，Types of MIME.
 * @returns {Object} Promise , resolve Function parameters are optimized pictures Blob Object,
 * If the output type is image/gif，Then return as is image Parameter content.
 */
const imageOptimization = (image, quality = 0.9, { maxWidth = 1920, mimeType } = {}) => {
  return new Promise((resolve, reject) => {
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = function() {
        toBlob(this.result);
      };
      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      toBlob(image);
    }

    /**
     * To Blob
     * @param {String} data - Image: Data URL
     */
    function toBlob(data) {
      const type = data.match(/data:([^;,]+)/);
      if (Array.isArray(type)) {
        const outputType = mimeType ? mimeType : type[1];

        if (outputType === 'image/gif') {
          return resolve(image);
        }

        const virtualImage = new Image();
        virtualImage.src = data;
        virtualImage.onload = function() {
          let width = this.naturalWidth;
          let height = this.naturalHeight;
          if (width > maxWidth) {
            height = Math.round((maxWidth * height) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          context.drawImage(this, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            mimeType ? mimeType : type[1],
            quality
          );
        };
      } else {
        reject(new Error('Non-picture type Data URLs'));
      }
    }
  });
};

export default imageOptimization;
