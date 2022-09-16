type DebounceArgsType = {
  func: () => void;
  delayTime: number;
};

export const debounce = ({ func, delayTime }: DebounceArgsType) => {
  let timerId: NodeJS.Timeout | undefined = undefined;

  clearTimeout(timerId);
  timerId = setTimeout(() => {
    func();
  }, delayTime);
};
