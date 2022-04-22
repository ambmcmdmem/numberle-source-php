import Collation from '../src/server/module/Collation';
import Numberle from '../src/server/module/Numberle';
import {
  apiCheckDigit,
  StatusOfProposedSolutionType,
} from '../src/module/numberleConfig';
import Validation from '../src/module/Validation';

describe('Numberle', () => {
  const toBeTested = new Numberle(1);
  const cloneToBeTested = new Numberle(1);
  test('getAnswer', () => {
    expect(toBeTested.getAnswer()).toStrictEqual('80914');
    expect(cloneToBeTested.getAnswer()).toStrictEqual('80914');
    expect(cloneToBeTested.getAnswer()).not.toStrictEqual(80914);
    expect(toBeTested.getAnswer()).toStrictEqual(cloneToBeTested.getAnswer());
    expect(toBeTested.getAnswer()).toStrictEqual('80914');
  });
});

describe('Collation', () => {
  const toBeTested = new Collation();
  const numberle = new Numberle(1);
  test('statusOfProposedSolution', () => {
    expect(
      toBeTested.statusOfProposedSolution('01234', numberle.getAnswer())
    ).toStrictEqual<StatusOfProposedSolutionType[]>([
      'differentLocation',
      'differentLocation',
      'wrong',
      'wrong',
      'correct',
    ]);
    expect(
      toBeTested.statusOfProposedSolution('56789', numberle.getAnswer())
    ).toStrictEqual<StatusOfProposedSolutionType[]>([
      'wrong',
      'wrong',
      'wrong',
      'differentLocation',
      'differentLocation',
    ]);
    expect(() => {
      toBeTested.statusOfProposedSolution('0', numberle.getAnswer());
    }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
    expect(() => {
      toBeTested.statusOfProposedSolution('0123456789', numberle.getAnswer());
    }).toThrow(new Error('提示された文字列長と回答の文字列長が異なります。'));
  });
});

describe('numberleConfig', () => {
  test('apiCheckDigit', () => {
    expect(apiCheckDigit(1)).toStrictEqual(1234509876);
  });
});

describe('Validation', () => {
  const toBeTested = new Validation<StatusOfProposedSolutionType>();
  test('next + result', () => {
    expect(toBeTested.result('wrong')).toStrictEqual('wrong');
    expect(
      toBeTested.next(() => false, 'correct').result('wrong')
    ).toStrictEqual('correct');
    expect(
      toBeTested
        .next(() => true, 'correct')
        .next(() => false, 'differentLocation')
        .result('wrong')
    ).toStrictEqual('differentLocation');
  });
});
