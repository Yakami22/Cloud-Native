import Get from './routes/Get';

/**
 * Mandatory Hello World function.
 * @returns A string which contains "Hello world!"
 */
export const helloWorld = (): string => {
  return 'Hello world!';
};

/**
 * Function that returns the correct
 * System Information
 */
Get();
