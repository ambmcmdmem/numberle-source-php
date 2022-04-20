import Validation from '../src/module/Validation';

const validation = new Validation();

test('Validation tests.', () => {
  expect(validation.ensure('test')).toStrictEqual('test');
  expect(validation.ensure(123)).toStrictEqual(123);
  expect(() => {
    validation.ensure(undefined);
  }).toThrow(new Error('ensureの引数がnullもしくはundefinedになっています。'));
  expect(() => {
    validation.ensure(null);
  }).toThrow(new Error('ensureの引数がnullもしくはundefinedになっています。'));

  expect(
    validation.doesFallForValidation({ validation: () => true })
  ).toStrictEqual(true);
  expect(
    validation.doesFallForValidation({ validation: () => false })
  ).toStrictEqual(false);
});
