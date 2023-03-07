export const getHeaders = () => {
  const myHeaders = new Headers();
  myHeaders.append("api_key", process.env.CONTENT_STACK_API_KEY);
  myHeaders.append("access_token", process.env.CONTENT_STACK_DELIVERY_TOKEN);
  return myHeaders;
};
