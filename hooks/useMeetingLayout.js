import { useEffect, useState } from 'react';
import { largestRect } from 'rect-scaler';
import debounce from 'lodash.debounce';

/**
 * Calculate video meeting area layout
 * @param {number} videoCount
 * @param {number} offsetH
 * @param {number} offsetW
 * @param {number} aspectRatioW
 * @param {number} aspectRatioH
 */
export default function useMeetingLayout({
  videoCount,
  offsetH,
  offsetW,
  aspectRatioW = 4,
  aspectRatioH = 3,
}) {
  const [result, setResult] = useState({ width: 0, height: 0, cols: 0 });

  useEffect(() => {
    function recalculateLayout() {
      const { width: screenWidth } = document.body.getBoundingClientRect();
      const { height: screenHeight } = document.body.getBoundingClientRect();

      const { width, height, cols } = largestRect(
        screenWidth - offsetW,
        screenHeight - offsetH,
        videoCount,
        aspectRatioW,
        aspectRatioH
      );

      setResult({
        width,
        height,
        cols,
      });
    }

    const debouncedRecalculateLayout = debounce(recalculateLayout, 50);

    debouncedRecalculateLayout();

    window.addEventListener('resize', debouncedRecalculateLayout);

    return () => {
      window.removeEventListener('resize', debouncedRecalculateLayout);
    };
  }, [aspectRatioH, aspectRatioW, offsetH, offsetW, videoCount]);

  return result;
}
