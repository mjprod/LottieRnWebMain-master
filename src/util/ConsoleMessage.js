/* eslint-disable no-console */
export const showConsoleMessage = (message, ...optionalParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, optionalParams);
  }
};

export const showConsoleError = (message, ...optionalParams) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, optionalParams);
  }
};