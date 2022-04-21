import ErrorValidation from '../src/web/module/ErrorValidation';
import StatusValidation from '../src/server/module/StatusValidation';

const errorValidation = new ErrorValidation();
const statusValidation = new StatusValidation();

test('Validation tests.', () => {
  expect(
    errorValidation.next(() => true, 'errorValidationNextTest')
  ).toStrictEqual({
    validation: () => true,
    error: 'errorValidationNextTest',
  });
  expect(
    errorValidation.result([
      {
        validation: () => false,
        error: 'error validation result not display',
      },
      {
        validation: () => true,
        error: 'error validation result display',
      },
    ])
  ).toStrictEqual('error validation result');
});
