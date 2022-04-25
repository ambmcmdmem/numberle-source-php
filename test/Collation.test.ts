import Collation from '../src/server/module/Collation';
import Numberle from '../src/server/module/Numberle';
import { StatusOfProposedSolutionType } from '../src/module/numberleConfig';

describe('Collation', () => {
  const toBeTested = new Collation();
  // numberle.getAnswer = '80914'
  const numberle = new Numberle(1);
  describe('statusOfProposedSolution', () => {
    test('正答と回答の関係対応した評価結果を出力すること', () => {
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
    test('提示された文字列長が回答の文字列長と異なっていた場合、エラーを出力すること', () => {
      expect(() => {
        toBeTested.statusOfProposedSolution('0', numberle.getAnswer());
      }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
    });
  });
});
