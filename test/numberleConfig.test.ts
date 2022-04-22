import { apiCheckDigit } from '../src/module/numberleConfig';

test('numberleConfig test', () => {
  expect(apiCheckDigit(1)).toStrictEqual(1234509876);
});
