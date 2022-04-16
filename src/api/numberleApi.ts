import express from 'express';
import { apiPort } from './apiInformation';
import bodyParser from 'body-parser';
import Hash from '../modules/Hash';
const server = express();
// Answerはサーバー側で抱え込まない

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(apiPort);
server.post('/collation', (request, response): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });
  const hash = new Hash(request.body.seed);
  const answer = hash
    .shuffle([...Array(10).keys()])
    .slice(0, 5)
    .join('');
  const statusOfProposedSolution = [...request.body.proposedSolution].map(
    (proposedSolutionCharacter, proposedSolutionCharacterNo) => {
      if (
        proposedSolutionCharacter === answer.charAt(proposedSolutionCharacterNo)
      )
        return 'correct';
      else if (answer.includes(proposedSolutionCharacter))
        return 'differentLocation';
      else return 'wrong';
    }
  );
  response.send(statusOfProposedSolution);
});
