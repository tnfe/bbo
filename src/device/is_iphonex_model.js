export default function isIphoneXmodel() {
  // X XS, XS Max, XR
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896
    }
  ];
  if (typeof window !== 'undefined' && window) {
    const { devicePixelRatio, screen } = window;
    const { width, height } = screen;
    return xSeriesConfig.some(
      (item) =>
        item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height
    );
  }
  return false;
}
