import actions from '../../Actions/ProfilePageActions';
import AppState from '../../State/AppState';
import { UIModes } from '../../Constants/AppConstants'
import UserActions from '../../Actions/UserActions';
import AppActions from '../../Actions/AppActions';

jest.mock('../../Actions/UserActions', () => ({
  update: jest.fn()
}))

jest.mock('../../Actions/AppActions', () => ({
  error: jest.fn()
}))

describe('ProfilePageActions', () => {
  describe('initEdit should', () => {
    test('set AppState.mode to edit', () => {
      actions.initEdit();
      expect(AppState.mode).toBe(UIModes.EDIT);
    })

    test('reset AppState.editUser to loggedUser info', () => {
      AppState.loggedUser = { id: 2, lastname: 'Prezime', firstname: 'Ime', group: { id:3, name:'Grupa1' }};
      actions.initEdit();
      expect(AppState.editUser).toEqual(AppState.loggedUser);
    })
  })

  describe('handleCancel should', () => {
    test('set AppState.mode to view', () => {
      actions.handleCancel();
      expect(AppState.mode).toBe(UIModes.VIEW);
    })
  })

  describe('handleFirstnameChange should', () => {
    describe('delete firstname property of AppState editUser property if value is', () => {
        test('undefined', () => {
          AppState.editUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: {} });
          expect(AppState.editUser.firstname).toBeUndefined();
        })

        test('an empty string', () => {
          AppState.editUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: { value: '' } });
          expect(AppState.editUser.firstname).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          AppState.editUser = { firstname: 'name' };
          actions.handleFirstnameChange({ target: { value: '   ' } });
          expect(AppState.editUser.firstname).toBeUndefined();
        })
      })

      test('set firstname property of AppState data property to the argument.target.value', () => {
        AppState.editUser = { firstname: 'name' };
        let newName = 'newName';
        actions.handleFirstnameChange({ target: { value: newName } });
        expect(AppState.editUser.firstname).toBe(newName);
      })
  })

  describe('handleLastnameChange should', () => {
    describe('delete lastname property of AppState editUser property if value is', () => {
        test('undefined', () => {
          AppState.editUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: {} });
          expect(AppState.editUser.lastname).toBeUndefined();
        })

        test('an empty string', () => {
          AppState.editUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: { value: '' } });
          expect(AppState.editUser.lastname).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          AppState.editUser = { lastname: 'name' };
          actions.handleLastnameChange({ target: { value: '   ' } });
          expect(AppState.editUser.lastname).toBeUndefined();
        })
      })

      test('set firstname property of AppState data property to the argument.target.value', () => {
        AppState.editUser = { lastname: 'name' };
        let newLastName = 'newLastName';
        actions.handleLastnameChange({ target: { value: newLastName } });
        expect(AppState.editUser.lastname).toBe(newLastName);
      })
  })

  describe('handleEmailChange should', () => {
    describe('delete email property of AppState editUser property if value is', () => {
      test('undefined', () => {
        AppState.editUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: {} });
        expect(AppState.editUser.email).toBeUndefined();
      })

      test('empty string', () => {
        AppState.editUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '' } });
        expect(AppState.editUser.email).toBeUndefined();
      })

      test('an empty trimmed string', () => {
        AppState.editUser = { email: 'exapmple@gmail.com' };
        actions.handleEmailChange({ target: { value: '   ' } });
        expect(AppState.editUser.email).toBeUndefined();
      })
    })

    test('set email property of AppState editUser property to the argument.target.value', () => {
      AppState.editUser = { email: 'exapmple@gmail.com' };
      let newEmail = 'newEmail@yahoo.rs';
      actions.handleEmailChange({ target: { value: newEmail } });
      expect(AppState.editUser.email).toBe(newEmail);
    })
  })

  describe('handleSubmit should', () => {
    test('call UserActions update method if AppState editUser is valid', () => {
      let validFormData = { email: 'exapmple@yahoo.com', firstname: 'ime', lastname: 'prezime' };
      AppState.editUser = validFormData;
      actions.handleSubmit();
      expect(UserActions.update).toBeCalled();
    })

    test('call AppActions error method if AppState editUser is not valid', () => {
      let invalidFormData = { email: 'exapmple@yahoo.c', firstname: 'ime', lastname: 'prezime' };
      AppState.editUser = invalidFormData;
      actions.handleSubmit();
      expect(AppActions.error).toBeCalled();
    })
  })
})
