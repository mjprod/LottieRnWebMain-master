/* eslint-disable no-console */
export const showConsoleMessage = (message, ...optionalParams) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, optionalParams);
  }
};

export const showConsoleError = (message, ...optionalParams) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, optionalParams);
  }
};