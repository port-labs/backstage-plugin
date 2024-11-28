export type UsePortResult<T extends (...args: any) => Promise<any>> = {
  execute: T;
  data: Awaited<ReturnType<T>> | undefined;
  error: Error | undefined;
  loading: boolean;
};
