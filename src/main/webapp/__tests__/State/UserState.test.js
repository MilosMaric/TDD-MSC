import state from '../../State/UserState';

describe('UserState', () => {

  describe('exist should return', () => {
    test('false if data is null', () => {
      state.data = null;
      expect(state.exist).toBe(false);
    })

    test('false if data is undefined', () => {
      state.data = undefined;
      expect(state.exist).toBe(false);
    })

    test('false if data is an empty array', () => {
      state.data = [];
      expect(state.exist).toBe(false);
    })

    test('true if data is a non empty array', () => {
      state.data = [{ email: 'asd123@gmail.com' }];
      expect(state.exist).toBe(true);
    })
  })

  describe('isFormValid should return', () => {
    test('false if newUser is null', () => {
      state.newUser = null;
      expect(state.isFormValid).toBe(false);
    })

    test('false if newUser is undefined', () => {
      state.newUser = undefined;
      expect(state.isFormValid).toBe(false);
    })

    test('false if newUser is an empty object', () => {
      state.newUser = {};
      expect(state.isFormValid).toBe(false);
    })

    test('false if newUser is invalid', () => {
      state.newUser = { password: 'special_characters*all123-around', email: 'name_lastname@gmail.com'};
      expect(state.isFormValid).toBe(false);
    })

    test('true if newUser is valid', () => {
      state.newUser = {
        password: 'super123password',
        email: 'name123@yahoo.com',
        firstname: 'firstName',
        lastname: 'lastName',
        group: { id: 2 }
      };
      expect(state.isFormValid).toBe(true);
    })
  })

  describe('error should return', () => {
    test('non empty string if data is null', () => {
      state.newUser = null;
      expect(state.error).not.toBe('');
    })

    test('non empty string if data is undefined', () => {
      state.newUser = undefined;
      expect(state.error).not.toBe('');
    })

    test('non empty string if newUser is an empty object', () => {
      state.newUser = {};
      expect(state.error).not.toBe('');
    })

    test('non empty string if newUser is invalid', () => {
      state.newUser = { password: 'super123password', email: 'name123@yahoo.com'};
      expect(state.error).not.toBe('');
    })

    test('empty string if newUser is valid', () => {
      state.newUser = {
        password: 'super123password',
        email: 'name123@yahoo.com',
        firstname: 'firstName',
        lastname: 'lastName',
        group: { id: 2 }
      };
      expect(state.error).toBe('');
    })
  });

});
