/**
 * 图片尺寸检查
 * @param {(Object|String)} image - 图片信息，支持 File 对象 或 Data URLs
 * @param {Object} [options={}] - 检查参数
 * @param {Number} [options.width] - 检查宽度
 * @param {Number} [options.height] - 检查高度
 * @param {Number} [deviation=0] - 允许的偏差量
 */

function checkImageSize(image, options, deviation = 0) {
  return new Promise((resolve, reject) => {
    /* #region 判断图片信息类型 */
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = function() {
        checkSize(this.result);
      };
      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      checkSize(image);
    }
    /* #endregion */

    /**
     * 检测图片尺寸
     * @param {String} data - 图片数据：Data URL
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
    /* #endregion */
  });
}

/**
 * 图片优化，暂不支持 gif 图片
 * @param {(Object|String)} image - 图片信息，支持 File 对象 或 Data URLs
 * @param {Number} [quality=0.9] - 输出图片质量，0 - 1 之间，仅 image/jpeg 与 image/webp 有效
 * @param {Object} [options={}] - 输出图片相关选项
 * @param {Number} [options.maxWidth=1920] - 输出图片的最大宽度，若图片原始宽度小于该宽度，则返回原始尺寸图片，若图片原始宽度大于该宽度，则返回等比缩放为该尺寸的图片
 * @param {String} [options.mimeType] - 输出图片格式，MIME 类型
 * @returns {Object} Promise 对象，resolve 函数参数为优化后的图片 Blob 对象，如果输出类型为 image/gif，则原样返回 image 参数内容
 */
function imageOptimization(image, quality = 0.9, { maxWidth = 1920, mimeType } = {}) {
  return new Promise((resolve, reject) => {
    /* #region 判断图片信息类型 */
    if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = function() {
        toBlob(this.result);
      };
      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      toBlob(image);
    }
    /* #endregion */

    /**
     * 转换为 Blob 类型
     * @param {String} data - 图片数据：Data URL
     */
    function toBlob(data) {
      const type = data.match(/data:([^;,]+)/);
      if (Array.isArray(type)) {
        const outputType = mimeType ? mimeType : type[1];

        // 暂不支持 gif 图片，原样返回 image 参数内容
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
        reject(new Error('[Slug Function] 非图片类型的 Data URLs'));
      }
    }
  });
}

export { checkImageSize, imageOptimization };
