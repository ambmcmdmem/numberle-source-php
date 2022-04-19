import Collation from '../src/api/Collation';
import { StatusOfProposedSolutionType } from '../src/modules/numberleModule';

const toBeTested = new Collation(1);
const cloneToBeTested = new Collation(1);
const seedsToCheckForBias = [1, 5, 10, 55, 100, 1111, 50000];

test('Collation Tests.', () => {
  seedsToCheckForBias.forEach((seedToCheckForBias): void => {
    console.log(
      `Answer seed:${seedToCheckForBias} ${new Collation(
        seedToCheckForBias
      ).getAnswer()}`
    );
  });

  expect(toBeTested.getAnswer()).toStrictEqual('80914');
  expect(cloneToBeTested.getAnswer()).toStrictEqual('80914');
  expect(cloneToBeTested.getAnswer()).not.toStrictEqual(80914);
  expect(toBeTested.getAnswer()).toStrictEqual(cloneToBeTested.getAnswer());
  expect(toBeTested.getAnswer()).toStrictEqual('80914');

  expect(toBeTested.statusOfProposedSolution('01234')).toStrictEqual<
    StatusOfProposedSolutionType[]
  >(['differentLocation', 'differentLocation', 'wrong', 'wrong', 'correct']);
  expect(toBeTested.statusOfProposedSolution('56789')).toStrictEqual<
    StatusOfProposedSolutionType[]
  >(['wrong', 'wrong', 'wrong', 'differentLocation', 'differentLocation']);
  expect(() => {
    toBeTested.statusOfProposedSolution('0');
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
  expect(() => {
    toBeTested.statusOfProposedSolution('0123456789');
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
});
