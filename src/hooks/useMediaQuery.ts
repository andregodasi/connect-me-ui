import { getWindow } from '@/shared/helpers/dom';
import React, { useCallback } from 'react';

export default function useMediaQuery() {
  const safeWindow = getWindow();
  const isSSR = !safeWindow;

  const setDimensions = useCallback(() => {
    return {
      width: isSSR ? 1200 : safeWindow?.innerWidth,
      height: isSSR ? 800 : safeWindow?.innerHeight,
    };
  }, [isSSR, safeWindow?.innerHeight, safeWindow?.innerWidth]);

  const [windowSize, setWindowSize] = React.useState(setDimensions());

  const changeWindowSize = useCallback(() => {
    setWindowSize(setDimensions());
  }, [setDimensions]);

  React.useEffect(() => {
    window.addEventListener('resize', changeWindowSize);

    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, [changeWindowSize]);

  const width = windowSize.width;
  const height = windowSize.height;
  const isXS = width > 375;
  const isSM = width > 576;
  const isMD = width > 768;
  const isLG = width > 992;
  const isXL = width > 1280;
  const isXXL = width > 1536;

  return { width, height, isXS, isSM, isMD, isLG, isXL, isXXL };
}
