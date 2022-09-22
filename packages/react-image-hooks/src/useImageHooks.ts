import { useCallback, useLayoutEffect, useRef, useState } from "react";

import { debounce } from "./utils";

type ArgsType = {
  url: string;
  placeholderUrl?: string;
  maxErrorRetryCount?: number;
  errorRetryInterval?: number;
};

type ImageStatus = "loading" | "loaded" | "error";

export const useImageHooks = ({
  url,
  placeholderUrl,
  maxErrorRetryCount = 5,
  errorRetryInterval = 1000,
}: ArgsType) => {
  const [src, setSrc] = useState(placeholderUrl);
  const [status, setStatus] = useState<ImageStatus>("loading");
  const mountRef = useRef(false);
  let errorCount = 0;

  const loadImage = useCallback(() => {
    const image = new Image();
    image.src = url;

    image.onload = () => {
      setStatus("loaded");
      setSrc(url);
    };

    image.onerror = () => {
      if (errorCount < maxErrorRetryCount) {
        ++errorCount;
        return debounce({ func: loadImage, delayTime: errorRetryInterval });
      }
    };
  }, [errorCount]);

  useLayoutEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
      loadImage();
    }
  }, []);

  return {
    src,
    status,
  };
};
