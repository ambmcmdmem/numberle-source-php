import express from 'express';
import { apiPort } from '../apiInformation';
const server = express();

server.listen(apiPort);
server.post('/setAnswer', (request, response): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  response.send('Success');
});
