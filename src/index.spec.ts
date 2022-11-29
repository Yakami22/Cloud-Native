import systest from './SystemInfo';
import { helloWorld } from './index';

import fetch from 'node-fetch';

describe('typeScript test suite', () => {
  it('should return "Hello world!"', () => {
    expect.assertions(1);
    expect(helloWorld()).toBe('Hello world!');
  });
});

describe('get Method test', () => {
  it('should contain CPU attribute', async () => {
    expect.assertions(5);
    const data = await systest();
    expect(data).toHaveProperty('cpu');
    expect(data).toHaveProperty('system');
    expect(data).toHaveProperty('mem');
    expect(data).toHaveProperty('os');
    expect(data).toHaveProperty('currentLoad');
  });
});

// describe('server test', () => {
//   it('should return 200 status with right url', async () => {
//     expect.assertions(1);
//     const response = await fetch('http://localhost:5000/api/v1/sysinfo', {
//       method: 'GET',
//     });
//     expect(response.status).toBe(200);
//   });
// });

// describe('server test wrong url', () => {
//   it('should return 404 status with right url', async () => {
//     expect.assertions(1);
//     const response = await fetch('http://localhost:5000/', {
//       method: 'GET',
//     });
//     expect(response.status).toBe(404);
//   });
// });
