import UserActions from '../../Actions/UserActions';
import AppActions from '../../Actions/AppActions';
import actions from '../../Actions/LoginPageActions';
import LoginState from '../../State/LoginState';

jest.mock('../../Actions/UserActions', () => ({
  login: jest.fn()
}))

jest.mock('../../Actions/AppActions', () => ({
  error: jest.fn()
}))

describe('LoginPageActions', () => {
  describe('handleEmailChange should', () => {
    describe('delete email property of LoginState data property if value is', () => {
      test('undefined', () => {
        LoginState.data = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: {} });
        expect(LoginState.data.email).toBeUndefined();
      })

      test('empty string', () => {
        LoginState.data = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '' } });
        expect(LoginState.data.email).toBeUndefined();
      })

      test('an empty trimmed string', () => {
        LoginState.data = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '   ' } });
        expect(LoginState.data.email).toBeUndefined();
      })
    })

    test('set email property of LoginState data property to the argument.target.value', () => {
      LoginState.data = { email: 'exapmple@gmail.com' };
      let newEmail = 'newEmail@yahoo.rs';
      actions.handleEmailChange({ target: { value: newEmail } });
      expect(LoginState.data.email).toBe(newEmail);
    })

  })

  describe('handlePasswordChange should', () => {
    describe('delete password property of LoginState data property if value is', () => {
        test('undefined', () => {
          LoginState.data = { password: 'super123password321' };
          actions.handlePasswordChange({ target: {} });
          expect(LoginState.data.password).toBeUndefined();
        })

        test('an empty string', () => {
          LoginState.data = { password: 'super123password321' };
          actions.handlePasswordChange({ target: { value: '' } });
          expect(LoginState.data.password).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          LoginState.data = { password: 'super123password321' };
          actions.handlePasswordChange({ target: { value: '   ' } });
          expect(LoginState.data.password).toBeUndefined();
        })
      })

      test('set password property of LoginState data property to the argument.target.value', () => {
        LoginState.data = { password: 'super123password321' };
        let newPassword = 'new987password';
        actions.handlePasswordChange({ target: { value: newPassword } });
        expect(LoginState.data.password).toBe(newPassword);
      })
  })

  describe('handleSubmit should', () => {
    test('call UserActions login method if LoginState data is valid', () => {
      let validFormData = { email: 'exapmple@yahoo.com', password: 'password123' };
      LoginState.data = validFormData;
      actions.handleSubmit();
      expect(UserActions.login).toBeCalled();
    })

    test('call AppActions error method if LoginState data is not valid', () => {
      let invalidFormData = { email: 'validemail@yahoo.com', password: 'invalid_password' };
      LoginState.data = invalidFormData;
      actions.handleSubmit();
      expect(AppActions.error).toBeCalled();
    })
  })
})
