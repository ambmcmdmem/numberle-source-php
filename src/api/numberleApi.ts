import express from 'express';
import { apiPort } from './apiInformation';
import bodyParser from 'body-parser';
import Collation from '../modules/Collation';
const server = express();
// Answerはサーバー側で抱え込まない

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(apiPort);
server.post('/collation', (request, response): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  const collation = new Collation(request.body.seed);
  const statusOfProposedSolution = collation.statusOfProposedSolution(
    request.body.proposedSolution
  );
  response.send(statusOfProposedSolution);
});

server.post('/getAnswer', (request, response): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  const collation = new Collation(request.body.seed);
  const answer = collation.getAnswer();
  response.send(answer);
});
