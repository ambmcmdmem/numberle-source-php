import express from 'express';
import bodyParser from 'body-parser';
import Collation from '../module/Collation';
import Numberle from '../module/Numberle';
import { apiCheckDigit } from '../../module/numberleModule';
import { accessAllowOrigin } from '../module/apiInformation';
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((request, response, next): void => {
  if (
    apiCheckDigit(Number(request.body.seed)) !== Number(request.body.checkDigit)
  )
    return;

  response.set({
    'Access-Control-Allow-Origin': accessAllowOrigin,
  });
  next();
});

server.post('/collation', (request, response): void => {
  response.send(
    new Collation().statusOfProposedSolution(
      request.body.proposedSolution,
      new Numberle(request.body.seed).getAnswer()
    )
  );
});

server.post('/answer', (request, response): void => {
  response.send(new Numberle(request.body.seed).getAnswer());
});

server.listen(8000);
