import Validation from '../src/module/Validation';
import { StatusOfProposedSolutionType } from '../src/module/numberleConfig';

describe('Validation', () => {
  const toBeTested = new Validation<StatusOfProposedSolutionType>();
  describe('next', () => {
    test('nextを呼び出す前後でインスタンスが異なるか', () => {
      expect(toBeTested).not.toStrictEqual(
        toBeTested.next(() => true, 'correct')
      );
    });
    test('nextがチェーンをしてもnextを呼び出す前後でインスタンスが異なっているか', () => {
      expect(toBeTested.next(() => true, 'correct')).not.toStrictEqual(
        toBeTested
          .next(() => true, 'correct')
          .next(() => false, 'differentLocation')
      );
    });
  });
  describe('result', () => {
    test('resultのみのとき、defaultResultの値が返されるか', () => {
      expect(toBeTested.result('wrong')).toStrictEqual('wrong');
    });
  });
  describe('next + result', () => {
    test('next内のvalidation()がfalseであるとき、resultの値を返すか', () => {
      expect(
        toBeTested.next(() => false, 'correct').result('wrong')
      ).toStrictEqual('correct');
    });
    test('nextがチェーンをしてもresultの値を返すか', () => {
      expect(
        toBeTested
          .next(() => true, 'correct')
          .next(() => false, 'differentLocation')
          .result('wrong')
      ).toStrictEqual('differentLocation');
    });
  });
});
