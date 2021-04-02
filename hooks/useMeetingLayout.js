import { useEffect, useState } from 'react';
import { largestRect } from 'rect-scaler';
import debounce from 'lodash.debounce';

/**
 * Calculate video meeting area layout
 * @param {number} videoCount
 * @param {number} offsetH
 * @param {number} offsetW
 */
export default function useMeetingLayout({ videoCount, offsetH, offsetW }) {
  const [result, setResult] = useState({ width: 0, height: 0, cols: 0 });

  useEffect(() => {
    function recalculateLayout() {
      const { width: screenWidth } = document.body.getBoundingClientRect();
      const { height: screenHeight } = document.body.getBoundingClientRect();

      const { width, height, cols } = largestRect(
        screenWidth - offsetW,
        screenHeight - offsetH,
        videoCount,
        16,
        9
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
  }, [offsetH, offsetW, videoCount]);

  return result;
}
