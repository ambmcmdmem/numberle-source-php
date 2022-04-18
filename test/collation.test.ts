import Collation from '../src/modules/Collation';
import { StatusOfProposedSolutionType } from '../src/modules/numberleModule';

const toBeTested = new Collation(1);
const cloneToBeTested = new Collation(1);
const collationWithASeedOf10 = new Collation(10);
const collationWithASeedOf55 = new Collation(55);
const collationWithASeedOf100 = new Collation(100);
const collationWithASeedOf1111 = new Collation(1111);
const collationWithASeedOf50000 = new Collation(50000);

test('Collation Tests.', () => {
  console.log(`Answer seed:1 ${toBeTested.getAnswer()}`);
  console.log(`Answer seed:10 ${collationWithASeedOf10.getAnswer()}`);
  console.log(`Answer seed:55 ${collationWithASeedOf55.getAnswer()}`);
  console.log(`Answer seed:100 ${collationWithASeedOf100.getAnswer()}`);
  console.log(`Answer seed:1111 ${collationWithASeedOf1111.getAnswer()}`);
  console.log(`Answer seed:50000 ${collationWithASeedOf50000.getAnswer()}`);

  expect(toBeTested.getAnswer()).toStrictEqual('12783');
  expect(cloneToBeTested.getAnswer()).toStrictEqual('12783');
  expect(toBeTested.getAnswer()).toStrictEqual(cloneToBeTested.getAnswer());
  expect(toBeTested.getAnswer()).toStrictEqual('12783');

  expect(toBeTested.statusOfProposedSolution('01234')).toStrictEqual<
    StatusOfProposedSolutionType[]
  >([
    'wrong',
    'differentLocation',
    'differentLocation',
    'differentLocation',
    'wrong',
  ]);
  expect(toBeTested.statusOfProposedSolution('56789')).toStrictEqual<
    StatusOfProposedSolutionType[]
  >(['wrong', 'wrong', 'correct', 'correct', 'wrong']);
  expect(() => {
    toBeTested.statusOfProposedSolution('0');
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
  expect(() => {
    toBeTested.statusOfProposedSolution('0123456789');
  }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
});
