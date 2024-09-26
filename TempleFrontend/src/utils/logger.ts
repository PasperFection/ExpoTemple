const logger = {
  error: async (error: Error) => {
    console.error(error);
    // Implement your error logging logic here
    // For example, you could send the error to a remote logging service
  },
  info: (message: string) => {
    console.log(message);
    // Implement your info logging logic here
  }
};

export default logger;