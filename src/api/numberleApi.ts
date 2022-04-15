import express from 'express';
import { apiPort } from './apiInformation';
import bodyParser from 'body-parser';
import Random from '../modules/Random';
const server = express();
let answer: number | null = null;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.listen(apiPort);
server.post('/setAnswer', (request, response): void => {
  response.set({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  });

  const randomForSeed = new Random(request.body.seed);
  const forSeedExclusion = [...Array(10).keys()];
  answer = Number(
    [...Array(5).keys()]
      .map(
        () =>
          forSeedExclusion.splice(
            Math.abs(randomForSeed.next()) % forSeedExclusion.length,
            1
          )[0]
      )
      .join('')
  );

  response.send(String(answer));
});

// 仕様書について
// Composition API Option API
// postで入れ込むとき
