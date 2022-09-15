type DebounceArgsType = {
  func: () => void;
  ms: number;
};

export const debounce = ({ func, ms }: DebounceArgsType) => {
  let timerId: NodeJS.Timeout | undefined = undefined;

  clearTimeout(timerId);
  timerId = setTimeout(() => {
    func();
  }, ms);
};
