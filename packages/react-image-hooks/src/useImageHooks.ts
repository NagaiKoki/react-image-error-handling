import { useState, useCallback, useEffect, useRef, RefObject } from "react";

import { debounce } from "./utils";

type ArgsType = {
  imageUrl: string;
  errorStateImageUrl?: string;
  maxRetryCount?: number;
  retryInterval?: number;
};

type ReturnType = {
  ref: RefObject<HTMLImageElement>;
  load: boolean;
  onLoad: () => void;
  onError: (() => void) | undefined;
};

export const useImageHooks = ({
  imageUrl,
  errorStateImageUrl,
  maxRetryCount = 5,
  retryInterval = 1000,
}: ArgsType): ReturnType => {
  const [errorCount, setErrorCount] = useState(0);
  const [load, setLoad] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const isOverRetryCount = errorCount > maxRetryCount;

  const handleOnLoad = useCallback(() => {
    setLoad(true);
  }, []);

  const handleOnError = useCallback(() => {
    setErrorCount(errorCount + 1);
  }, [errorCount]);

  const handleOnRetry = useCallback(() => {
    if (imageRef.current) {
      if (errorCount < maxRetryCount) {
        imageRef.current.src = imageUrl;
      } else if (errorCount === maxRetryCount && !!errorStateImageUrl) {
        imageRef.current.src = errorStateImageUrl;
      }
    }
  }, [errorCount, maxRetryCount, imageUrl, errorStateImageUrl]);

  useEffect(() => {
    handleOnRetry();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCount]);

  return {
    ref: imageRef,
    load,
    onLoad: handleOnLoad,
    onError: isOverRetryCount
      ? undefined
      : () => debounce({ func: handleOnError, delayTime: retryInterval }),
  };
};
