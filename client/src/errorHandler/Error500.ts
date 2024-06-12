export const Error500 = (res: Response, msg: string): void => {
  if (!res || res.status === 500) throw new Error(msg);
}