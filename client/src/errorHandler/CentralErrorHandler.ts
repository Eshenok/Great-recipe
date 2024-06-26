export const CentralErrorHandler = (res: Response) => {
  if (res.ok) return;
  switch (res.status) {
    case 401:
      throw new Error('401');
      break;
    case 404:
      throw new Error('404');
      break;
    case 403:
      throw new Error(`403`);
      break;
    case 409:
      throw new Error(`409`);
      break;
    default:
      throw new Error(`500`);
      break
  }
}