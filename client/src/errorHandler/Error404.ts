export const Error404 = (res: Response, msg: string): void => {
  if (res.status === 404) throw new Error(msg);
}