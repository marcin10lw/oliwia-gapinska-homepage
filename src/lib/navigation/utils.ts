export const getDynamicRoute = (path: string, params: Record<string, string | undefined | null>) => {
  let url = path;

  for (const param in params) {
    const value = params[param];
    if (value) {
      url = url.replace(`:${param}`, value);
    }
  }

  return url;
};
