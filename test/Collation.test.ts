import Collation from '../src/server/module/Collation';
import Numberle from '../src/server/module/Numberle';
import { StatusOfProposedSolutionType } from '../src/module/numberleConfig';

describe('Collation', () => {
  const toBeTested = new Collation();
  // numberle.getAnswer = '80914'
  const numberle = new Numberle(1);
  describe('statusOfProposedSolution', () => {
    test('answerが01234, proposedSolutionが02468の場合 ["correct", "differentLocation", "differentLocation", "wrong", "wrong"]となること', () => {
      expect(
        toBeTested.statusOfProposedSolution('01234', numberle.getAnswer())
      ).toStrictEqual<StatusOfProposedSolutionType[]>([
        'differentLocation',
        'differentLocation',
        'wrong',
        'wrong',
        'correct',
      ]);
    });
    test('提示された文字列長が回答の文字列長と異なっていた場合、エラーを返すか', () => {
      expect(() => {
        toBeTested.statusOfProposedSolution('0', numberle.getAnswer());
      }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
    });
  });
});
