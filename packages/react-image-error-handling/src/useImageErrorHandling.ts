import { useState, useCallback, useEffect, useRef, RefObject } from "react";

type ArgsType = {
  imageUrl: string;
  maxRetryCount?: number;
  retryInterval?: number;
};

type ReturnType = {
  ref: RefObject<HTMLImageElement>;
  loaded: boolean;
  onLoaded: () => void;
  onError: () => void;
};

export const useImageErrorHandling = ({
  imageUrl,
  maxRetryCount,
  retryInterval,
}: ArgsType): ReturnType => {
  const [errorCount, setErrorCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleOnLoaded = useCallback(() => {
    if (imageRef.current) {
      setLoaded(true);
    }
  }, [imageRef]);

  const handleOnError = useCallback(() => {
    if (imageRef.current)
      [
        (imageRef.current.onerror = () => {
          setErrorCount(errorCount + 1);
        }),
      ];
  }, [errorCount, imageRef]);

  // const handleOnRetry = useCallback(() => {
  //   if (imageRef.current) {
  //     if (errorCount < maxRetryCount) {
  //       imageRef.current.src = imageUrl;
  //     }
  //   }
  // }, [errorCount, maxRetryCount, imageUrl]);

  useEffect(() => {
    if (imageRef.current) {
      const currentImage = imageRef.current;
      currentImage.addEventListener("load", handleOnLoaded);

      return () => {
        currentImage.removeEventListener("load", handleOnLoaded);
      };
    }
  }, [handleOnLoaded, imageRef]);

  return {
    ref: imageRef,
    loaded,
    onLoaded: handleOnLoaded,
    onError: handleOnError,
  };
};
