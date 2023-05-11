export type Result<E, T> =
  | { result: "ok"; data: T }
  | { result: "err"; error: E };
export const ok = <T>(data: T): Result<any, T> => ({ result: "ok", data });
export const err = <E>(error: E): Result<E, any> => ({ result: "err", error });
export const isOK = ({ result }: Result<any, any>) => result === "ok";

export type Extends<T, C> = T extends C ? T : never;
