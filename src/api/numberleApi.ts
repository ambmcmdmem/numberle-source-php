import express from 'express';
import { apiPort } from './apiInformation';
import bodyParser from 'body-parser';
import Collation from '../modules/Collation';
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((_, response, next): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  next();
});

server.listen(apiPort);
server.post('/collation', (request, response): void => {
  const collation = new Collation(request.body.seed);
  const statusOfProposedSolution = collation.statusOfProposedSolution(
    request.body.proposedSolution
  );
  response.send(statusOfProposedSolution);
});

server.post('/getAnswer', (request, response): void => {
  const collation = new Collation(request.body.seed);
  const answer = collation.getAnswer();
  response.send(answer);
});
