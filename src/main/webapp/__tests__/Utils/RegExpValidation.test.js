import RegExpValidation from '../../Utils/RegExpValidation';

describe('RegExpValidator', () => {

  describe('isLettersSr should return', () => {
    test('false for null', () => {
      let result = RegExpValidation.isLettersSr(null);
      expect(result).toBe(false);
    })

    test('false for undefined', () => {
      let result = RegExpValidation.isLettersSr(undefined);
      expect(result).toBe(false);
    })

    test('false for empty string', () => {
      let result = RegExpValidation.isLettersSr('');
      expect(result).toBe(false);
    })

    test('false for empty trimmed string', () => {
      let result = RegExpValidation.isLettersSr('   ');
      expect(result).toBe(false);
    })

    test('false for a string with digits', () => {
      let result = RegExpValidation.isLettersSr('only 1 digit');
      expect(result).toBe(false);
    })

    test('false for a string with special characters', () => {
      let result = RegExpValidation.isLettersSr('under_score');
      expect(result).toBe(false);
    })

    test('false for an number argument', () => {
      let result = RegExpValidation.isLettersSr(123);
      expect(result).toBe(false);
    })

    test('false for a boolean argument', () => {
      let result = RegExpValidation.isLettersSr(true);
      expect(result).toBe(false);
    })

    test('false for an object argument', () => {
      let result = RegExpValidation.isLettersSr({ word: 'Nešto' });
      expect(result).toBe(false);
    })

    test('false for an array argument', () => {
      let result = RegExpValidation.isLettersSr([ 'Nešto', 'Nešto2' ]);
      expect(result).toBe(false);
    })

    test('true for a string with only english chars', () => {
      let result = RegExpValidation.isLettersSr('some random string');
      expect(result).toBe(true);
    })

    test('true for a string with serbian latinic chars', () => {
      let result = RegExpValidation.isLettersSr('Imenko Prezimić');
      expect(result).toBe(true);
    })
  });

  describe('isLettersOrNumbers should return', () => {
    test('false for null', () => {
      let result = RegExpValidation.isLettersOrNumbers(null);
      expect(result).toBe(false);
    })

    test('false for undefined', () => {
      let result = RegExpValidation.isLettersOrNumbers(undefined);
      expect(result).toBe(false);
    })

    test('false for empty string', () => {
      let result = RegExpValidation.isLettersOrNumbers('');
      expect(result).toBe(false);
    })

    test('false for empty trimmed string', () => {
      let result = RegExpValidation.isLettersOrNumbers('   ');
      expect(result).toBe(false);
    })

    test('false for an number argument', () => {
      let result = RegExpValidation.isLettersOrNumbers(123);
      expect(result).toBe(false);
    })

    test('false for a boolean argument', () => {
      let result = RegExpValidation.isLettersOrNumbers(true);
      expect(result).toBe(false);
    })

    test('false for an object argument', () => {
      let result = RegExpValidation.isLettersOrNumbers({ word: 'Nešto' });
      expect(result).toBe(false);
    })

    test('false for an array argument', () => {
      let result = RegExpValidation.isLettersOrNumbers([ 'Nešto', 'Nešto2' ]);
      expect(result).toBe(false);
    })

    test('false for any special chars', () => {
      let result = RegExpValidation.isLettersOrNumbers('2_under_scores');
      expect(result).toBe(false);
    })

    test('false for any serbian special chars', () => {
      let result = RegExpValidation.isLettersOrNumbers('Imenko Prezimić');
      expect(result).toBe(false);
    })

    test('true for any string with only digits', () => {
      let result = RegExpValidation.isLettersOrNumbers('019233');
      expect(result).toBe(true);
    })

    test('true for any string with only letters', () => {
      let result = RegExpValidation.isLettersOrNumbers('Letters');
      expect(result).toBe(true);
    })

    test('true for any string with letters and digits', () => {
      let result = RegExpValidation.isLettersOrNumbers('pass123word332');
      expect(result).toBe(true);
    })
  });

  describe('isEmail should return', () => {
    test('false for null', () => {
      let result = RegExpValidation.isEmail(null);
      expect(result).toBe(false);
    })

    test('false for undefined', () => {
      let result = RegExpValidation.isEmail(undefined);
      expect(result).toBe(false);
    })

    test('false for empty string', () => {
      let result = RegExpValidation.isEmail('');
      expect(result).toBe(false);
    })

    test('false for empty trimmed string', () => {
      let result = RegExpValidation.isEmail('   ');
      expect(result).toBe(false);
    })

    test('false for an number argument', () => {
      let result = RegExpValidation.isEmail(123);
      expect(result).toBe(false);
    })

    test('false for a boolean argument', () => {
      let result = RegExpValidation.isEmail(true);
      expect(result).toBe(false);
    })

    test('false for an object argument', () => {
      let result = RegExpValidation.isEmail({ word: 'Nešto' });
      expect(result).toBe(false);
    })

    test('false for an array argument', () => {
      let result = RegExpValidation.isEmail([ 'Nešto', 'Nešto2' ]);
      expect(result).toBe(false);
    })

    test('false for no chars before @', () => {
      let result = RegExpValidation.isEmail('@gmail.com');
      expect(result).toBe(false);
    })

    test('false for no chars between @ and .', () => {
      let result = RegExpValidation.isEmail('mail@.com');
      expect(result).toBe(false);
    })

    test('false for less then 2 chars after .', () => {
      let result = RegExpValidation.isEmail('mail@gmail.c');
      expect(result).toBe(false);
    })

    test('false for more then 4 chars after .', () => {
      let result = RegExpValidation.isEmail('mail@gmail.comma');
      expect(result).toBe(false);
    })

    test('true for valid email string', () => {
      let result = RegExpValidation.isEmail('msc2@gmail.com');
      expect(result).toBe(true);
    })
  });
});
