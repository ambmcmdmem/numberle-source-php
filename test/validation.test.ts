import Validation from '../src/module/Validation';
import { StatusOfProposedSolutionType } from '../src/module/numberleConfig';

const toBeTested = new Validation<StatusOfProposedSolutionType>();

test('Validation tests.', () => {
  expect(toBeTested.result('wrong')).toStrictEqual('wrong');
  expect(toBeTested.next(() => false, 'correct').result('wrong')).toStrictEqual(
    'correct'
  );
  expect(
    toBeTested
      .next(() => true, 'correct')
      .next(() => false, 'differentLocation')
      .result('wrong')
  ).toStrictEqual('differentLocation');
});
