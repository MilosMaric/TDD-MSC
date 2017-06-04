import actions from '../../Actions/UsersPageActions';
import AppState from '../../State/AppState';
import UserState from '../../State/UserState';
import { UIModes } from '../../Constants/AppConstants'
import UserActions from '../../Actions/UserActions';
import AppActions from '../../Actions/AppActions';
import GroupActions from '../../Actions/GroupActions';

jest.mock('../../Actions/UserActions', () => ({
  update: jest.fn(),
  add: jest.fn()
}))

jest.mock('../../Actions/GroupActions', () => ({
  getAll: jest.fn()
}))

jest.mock('../../Actions/AppActions', () => ({
  error: jest.fn()
}))

describe('ProfilePageActions', () => {
  describe('initAdd should', () => {
    test('set AppState.mode to add', () => {
      actions.initAdd();
      expect(AppState.mode).toBe(UIModes.ADD);
    })

    test('call getAll method of GroupActions', () => {
      actions.initAdd();
      expect(GroupActions.getAll).toBeCalled();
    })
  })

  describe('handleCancel should', () => {
    test('set AppState.mode to view', () => {
      actions.handleCancel();
      expect(AppState.mode).toBe(UIModes.VIEW);
    })
  })

  describe('handleFirstnameChange should', () => {
    describe('delete firstname property of UserState newUser property if value is', () => {
        test('undefined', () => {
          UserState.newUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: {} });
          expect(UserState.newUser.firstname).toBeUndefined();
        })

        test('an empty string', () => {
          UserState.newUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: { value: '' } });
          expect(UserState.newUser.firstname).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          UserState.newUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: { value: '   ' } });
          expect(UserState.newUser.firstname).toBeUndefined();
        })
      })

      test('set firstname property of UserState newUser property to the argument.target.value', () => {
        UserState.newUser = { firstname: 'name' };
        let newName = 'newName';
        actions.handleFirstnameChange({ target: { value: newName } });
        expect(UserState.newUser.firstname).toBe(newName);
      })
  })

  describe('handleLastnameChange should', () => {
    describe('delete lastname property of UserState editUser property if value is', () => {
        test('undefined', () => {
          UserState.newUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: {} });
          expect(UserState.newUser.lastname).toBeUndefined();
        })

        test('an empty string', () => {
          UserState.newUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: { value: '' } });
          expect(UserState.newUser.lastname).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          UserState.newUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: { value: '   ' } });
          expect(UserState.newUser.lastname).toBeUndefined();
        })
      })

      test('set firstname property of UserState editUser property to the argument.target.value', () => {
        UserState.newUser = { lastname: 'name' };
        let newLastName = 'newLastName';
        actions.handleLastnameChange({ target: { value: newLastName } });
        expect(UserState.newUser.lastname).toBe(newLastName);
      })
  })

  describe('handleEmailChange should', () => {
    describe('delete email property of UserState editUser property if value is', () => {
      test('undefined', () => {
        UserState.newUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: {} });
        expect(UserState.newUser.email).toBeUndefined();
      })

      test('empty string', () => {
        UserState.newUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '' } });
        expect(UserState.newUser.email).toBeUndefined();
      })

      test('an empty trimmed string', () => {
        UserState.newUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '   ' } });
        expect(UserState.newUser.email).toBeUndefined();
      })
    })

    test('set email property of UserState editUser property to the argument.target.value', () => {
      UserState.newUser = { email: 'exapmple@gmail.com' };
      let newEmail = 'newEmail@yahoo.rs';
      actions.handleEmailChange({ target: { value: newEmail } });
      expect(UserState.newUser.email).toBe(newEmail);
    })
  })

  describe('handlePasswordChange should', () => {
    describe('delete password property of UserState newUser property if value is', () => {
        test('undefined', () => {
          UserState.newUser = { password: 'super123password321' };
          actions.handlePasswordChange({ target: {} });
          expect(UserState.newUser.password).toBeUndefined();
        })

        test('an empty string', () => {
          UserState.newUser = { password: 'super123password321' };
          actions.handlePasswordChange({ target: { value: '' } });
          expect(UserState.newUser.password).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          UserState.newUser = { password: 'super123password321' };
          actions.handlePasswordChange({ target: { value: '   ' } });
          expect(UserState.newUser.password).toBeUndefined();
        })
      })

      test('set password property of UserState newUser property to the argument.target.value', () => {
        UserState.newUser = { password: 'super123password321' };
        let newPassword = 'new987password';
        actions.handlePasswordChange({ target: { value: newPassword } });
        expect(UserState.newUser.password).toBe(newPassword);
      })
  })

  describe('handlePasswordChange should', () => {
    describe('delete group property of UserState newUser property if value is', () => {
        test('undefined', () => {
          UserState.newUser = { group: {id: 2} };
          actions.handleGroupChange({ target: {} });
          expect(UserState.newUser.password).toBeUndefined();
        })

        test('an empty string', () => {
          UserState.newUser = { group: {id: 2} };
          actions.handleGroupChange({ target: { value: '' } });
          expect(UserState.newUser.password).toBeUndefined();
        })
      })

      test('set password property of UserState newUser property to the argument.target.value', () => {
        UserState.newUser = { group: { id: 5 } };
        actions.handleGroupChange({ target: { value: 2 } });
        expect(UserState.newUser.group.id).toBe(2);
      })
  })

  describe('handleSubmit should', () => {
    test('call UserActions add method if AppState editUser is valid', () => {
      let validFormData = {
        password: 'super123password',
        email: 'name123@yahoo.com',
        firstname: 'firstName',
        lastname: 'lastName',
        group: { id: 2 }
      };
      UserState.newUser = validFormData;
      actions.handleSubmit();
      expect(UserActions.add).toBeCalled();
    })

    test('call AppActions error method if AppState editUser is not valid', () => {
      let invalidFormData = { email: 'exapmple@yahoo.c', firstname: 'ime', lastname: 'prezime' };
      UserState.newUser = invalidFormData;
      actions.handleSubmit();
      expect(AppActions.error).toBeCalled();
    })
  })
})
