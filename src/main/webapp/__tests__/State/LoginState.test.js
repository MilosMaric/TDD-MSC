import state from '../../State/LoginState';

describe('LoginState', () => {
  
  describe('isEmailValid should return', () => {
    test('false if data is null', () => {
      state.data = null;
      expect(state.isEmailValid).toBe(false);
    })

    test('false if data is undefined', () => {
      state.data = undefined;
      expect(state.isEmailValid).toBe(false);
    })

    test('false if data does not have an email field', () => {
      state.data = { password: 'asd' };
      expect(state.isEmailValid).toBe(false);
    })

    test('false if data has badly formatted email field value', () => {
      state.data = { email: 'asd@gmail.c' };
      expect(state.isEmailValid).toBe(false);
    })

    test('true if data has correctly formatted email field value', () => {
      state.data = { email: 'asd123@gmail.com' };
      expect(state.isEmailValid).toBe(true);
    })
  });

  describe('isPasswordValid should return', () => {
    test('false if data is null', () => {
      state.data = null;
      expect(state.isPasswordValid).toBe(false);
    })

    test('false if data is undefined', () => {
      state.data = undefined;
      expect(state.isPasswordValid).toBe(false);
    })

    test('false if data does not have an password field', () => {
      state.data = { email: 'asd123@gmail.com' };
      expect(state.isPasswordValid).toBe(false);
    })

    test('false if data has badly formatted password field value', () => {
      state.data = { password: 'special_characters*all123-around' };
      expect(state.isPasswordValid).toBe(false);
    })

    test('true if data has correctly formatted password field value', () => {
      state.data = { password: 'super123password' };
      expect(state.isPasswordValid).toBe(true);
    })
  });

  describe('isFormValid should return', () => {
    test('false if data is null', () => {
      state.data = null;
      expect(state.isFormValid).toBe(false);
    })

    test('false if data is undefined', () => {
      state.data = undefined;
      expect(state.isFormValid).toBe(false);
    })

    test('false if data is an empty object', () => {
      state.data = {};
      expect(state.isFormValid).toBe(false);
    })

    test('false if data is missing email and has a valid password field', () => {
      state.data = { password: 'super123password' };
      expect(state.isFormValid).toBe(false);
    })

    test('false if data is missing password and has a valid email field', () => {
      state.data = { email: 'asd123@gmail.com' };
      expect(state.isFormValid).toBe(false);
    })

    test('false if data has valid email and invalid password', () => {
      state.data = { email: 'asd123@gmail.com', password: 'special_characters*all123-around' };
      expect(state.isFormValid).toBe(false);
    })

    test('false if data has valid password and invalid email', () => {
      state.data = { password: 'super123password', email: 'name_lastname@gmail.com'};
      expect(state.isFormValid).toBe(false);
    })

    test('false if data has both password and email fields invalid', () => {
      state.data = { password: 'special_characters*all123-around', email: 'name_lastname@gmail.com'};
      expect(state.isFormValid).toBe(false);
    })

    test('true if data has both password and email fields valid', () => {
      state.data = { password: 'super123password', email: 'name123@yahoo.com'};
      expect(state.isFormValid).toBe(true);
    })
  })

  describe('error should return', () => {
    test('non empty string if data is null', () => {
      state.data = null;
      expect(state.error).not.toBe('');
    })

    test('non empty string if data is undefined', () => {
      state.data = undefined;
      expect(state.error).not.toBe('');
    })

    test('non empty string if data is an empty object', () => {
      state.data = {};
      expect(state.error).not.toBe('');
    })

    test('non empty string if data is missing email and has a valid password field', () => {
      state.data = { password: 'super123password' };
      expect(state.error).not.toBe('');
    })

    test('non empty string if data is missing password and has a valid email field', () => {
      state.data = { email: 'asd123@gmail.com' };
      expect(state.error).not.toBe('');
    })

    test('non empty string if data has valid email and invalid password', () => {
      state.data = { email: 'asd123@gmail.com', password: 'special_characters*all123-around' };
      expect(state.error).not.toBe('');
    })

    test('non empty string if data has valid password and invalid email', () => {
      state.data = { password: 'super123password', email: 'name_lastname@gmail.com'};
      expect(state.error).not.toBe('');
    })

    test('non empty string if data has both password and email fields invalid', () => {
      state.data = { password: 'special_characters*all123-around', email: 'name_lastname@gmail.com'};
      expect(state.error).not.toBe('');
    })

    test('empty string if data has both password and email fields valid', () => {
      state.data = { password: 'super123password', email: 'name123@yahoo.com'};
      expect(state.error).toBe('');
    })
  });
});
