import actions from '../../Actions/MyGroupPageActions';
import AppState from '../../State/AppState';
import { UIModes } from '../../Constants/AppConstants'
import GroupActions from '../../Actions/GroupActions';
import AppActions from '../../Actions/AppActions';

jest.mock('../../Actions/GroupActions', () => ({
  update: jest.fn()
}))

jest.mock('../../Actions/AppActions', () => ({
  error: jest.fn()
}))

describe('ProfilePageActions', () => {
  describe('initEdit should', () => {
    test('set AppState.mode to edit', () => {
      AppState.loggedUser = {};
      actions.initEdit();
      expect(AppState.mode).toBe(UIModes.EDIT);
    })

    test('reset AppState.editGroup to loggedUser group info', () => {
      AppState.loggedUser = {};
      AppState.loggedUser.group = { id: 2, name: 'Izvodjaci', description: 'opis'};
      actions.initEdit();
      expect(AppState.editGroup).toEqual(AppState.loggedUser.group);
    })
  })

  describe('handleCancel should', () => {
    test('set AppState.mode to view', () => {
      actions.handleCancel();
      expect(AppState.mode).toBe(UIModes.VIEW);
    })
  })

  describe('handleNameChange should', () => {
    describe('delete name property of AppState editGroup property if value is', () => {
        test('undefined', () => {
          AppState.editGroup = { name: 'name' };
          actions.handleNameChange({ target: {} });
          expect(AppState.editGroup.name).toBeUndefined();
        })

        test('an empty string', () => {
          AppState.editGroup = { name: 'name' };
          actions.handleNameChange({ target: { value: '' } });
          expect(AppState.editGroup.name).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          AppState.editGroup = { name: 'name' };
          actions.handleNameChange({ target: { value: '   ' } });
          expect(AppState.editGroup.name).toBeUndefined();
        })
      })

      test('set name property of AppState loggedUser editGroup property to the argument.target.value', () => {
        AppState.editGroup = { name: 'name' };
        let newName = 'newName';
        actions.handleNameChange({ target: { value: newName } });
        expect(AppState.editGroup.name).toBe(newName);
      })
  })

  describe('handleDescriptionChange should', () => {
    describe('delete name property of AppState editGroup property if value is', () => {
        test('undefined', () => {
          AppState.editGroup = { description: 'description' };
          actions.handleDescriptionChange({ target: {} });
          expect(AppState.editGroup.description).toBeUndefined();
        })

        test('an empty string', () => {
          AppState.editGroup = { description: 'description' };
          actions.handleDescriptionChange({ target: { value: '' } });
          expect(AppState.editGroup.description).toBeUndefined();
        })

        test('an empty trimmed string', () => {
          AppState.editGroup = { description: 'description' };
          actions.handleDescriptionChange({ target: { value: '   ' } });
          expect(AppState.editGroup.description).toBeUndefined();
        })
      })

      test('set description property of AppState loggedUser editGroup property to the argument.target.value', () => {
        AppState.editGroup = { description: 'description' };
        let newDesc = 'new description';
        actions.handleDescriptionChange({ target: { value: newDesc } });
        expect(AppState.editGroup.description).toBe(newDesc);
      })
  })

  describe('handleSubmit should', () => {
    test('call GroupActions update method if AppState editGroup is valid', () => {
      let validFormData = { description: 'description', name: 'name' };
      AppState.editGroup = validFormData;
      actions.handleSubmit();
      expect(GroupActions.update).toBeCalled();
    })

    test('call AppActions error method if AppState editGroup is not valid', () => {
      let invalidFormData = { description: 'description', name: 'group_name' };
      AppState.editGroup = invalidFormData;
      actions.handleSubmit();
      expect(AppActions.error).toBeCalled();
    })
  })
})
