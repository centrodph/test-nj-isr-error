export const cleanPath = (url: string) => {
  return url.split("/").filter(Boolean);
};

export const cleanUrl = (url: string) => {
  return cleanPath(url).join("/");
};

export const pathToUrl = (path: string[]) => {
  return "/" + path.join("/");
};
