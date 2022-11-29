import { createServer, IncomingMessage, ServerResponse } from 'http';
import systest from '../SystemInfo';

const Get = () => {
  const port = 5000;

  //Create Server
  const server = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
      //Check if URL is correct
      if (request.url === '/api/v1/sysinfo') {
        const data = JSON.stringify(await systest(), null, 4);
        // console.log(data);
        response.write(data);
      } //If URL is wrong Return 404
      else {
        response.statusCode = 404;
        response.statusMessage = 'Wrong url';
        response.write('No No No No');
      }
      response.end();
    },
  );

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

export default Get;
