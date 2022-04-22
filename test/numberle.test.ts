import Collation from '../src/server/module/Collation';
import Numberle from '../src/server/module/Numberle';
import {
  apiCheckDigit,
  StatusOfProposedSolutionType,
} from '../src/module/numberleConfig';
import Validation from '../src/module/Validation';

describe('Numberle', () => {
  const toBeTested = new Numberle(1);
  describe('getAnswer', () => {
    test('適切な回答を返すか', () => {
      expect(toBeTested.getAnswer()).toStrictEqual('80914');
    });
  });
});

describe('Collation', () => {
  const toBeTested = new Collation();
  const numberle = new Numberle(1);
  describe('statusOfProposedSolution', () => {
    test('適切な値を返すか', () => {
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
    test('提示された文字列長が回答の文字列長と異なっていた場合、きちんとエラーを返すか', () => {
      expect(() => {
        toBeTested.statusOfProposedSolution('0', numberle.getAnswer());
      }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
    });
  });
});

describe('numberleConfig', () => {
  describe('apiCheckDigit', () => {
    test('適当な値を返すか', () => {
      expect(apiCheckDigit(1)).toStrictEqual(1234509876);
    });
  });
});

describe('Validation', () => {
  const toBeTested = new Validation<StatusOfProposedSolutionType>();
  describe('result', () => {
    test('適切な値を返すか', () => {
      expect(toBeTested.result('wrong')).toStrictEqual('wrong');
    });
  });
  describe('result + next', () => {
    test('適切な値を返すか', () => {
      expect(
        toBeTested.next(() => false, 'correct').result('wrong')
      ).toStrictEqual('correct');
    });
    test('チェーンをしても適切な値を返すか', () => {
      expect(
        toBeTested
          .next(() => true, 'correct')
          .next(() => false, 'differentLocation')
          .result('wrong')
      ).toStrictEqual('differentLocation');
    });
  });
});
