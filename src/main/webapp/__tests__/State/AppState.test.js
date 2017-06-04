import state from '../../State/AppState';
import { UserRoles, MenuItems, UIModes } from '../../Constants/AppConstants';

describe('AppState', () => {

  describe('anyLogged should be', () => {
    test('false if loggedUser is null', () => {
      state.loggedUser = null;
      expect(state.anyLogged).toBe(false);
    })

    test('false if loggedUser is undefined', () => {
      state.loggedUser = undefined;
      expect(state.anyLogged).toBe(false);
    })

    test('true if loggedUser is a non empty object', () => {
      state.loggedUser = { type: UserRoles.ADMIN_ROLE };
      expect(state.anyLogged).toBe(true);
    })
  });

  describe('isAdmin should be', () => {
    test('false if loggedUser is undefined', () => {
      state.loggedUser = undefined;
      expect(state.isAdmin).toBe(false);
    })

    test('false if loggedUser is null', () => {
      state.loggedUser = null;
      expect(state.isAdmin).toBe(false);
    })

    test('false if loggedUser is an empty object', () => {
      state.loggedUser = {};
      expect(state.isAdmin).toBe(false);
    })

    test('false if loggedUsers type property is the GROUP_LEADER_ROLE constant', () => {
      state.loggedUser = { type: UserRoles.GROUP_LEADER_ROLE };
      expect(state.isAdmin).toBe(false);
    })

    test('true if loggedUsers type property is the ADMIN_ROLE constant', () => {
      state.loggedUser = { type: UserRoles.ADMIN_ROLE };
      expect(state.isAdmin).toBe(true);
    })
  });

  describe('isLeader should be', () => {
      test('false if loggedUser is undefined', () => {
        state.loggedUser = undefined;
        expect(state.isLeader).toBe(false);
      })

      test('false if loggedUser is null', () => {
        state.loggedUser = null;
        expect(state.isLeader).toBe(false);
      })

      test('false if loggedUser is an empty object', () => {
        state.loggedUser = {};
        expect(state.isLeader).toBe(false);
      })

      test('false if loggedUsers type property is the ADMIN_ROLE constant', () => {
        state.loggedUser = { type: UserRoles.ADMIN_ROLE };
        expect(state.isLeader).toBe(false);
      })

      test('true if loggedUsers type property is the ADMIN_ROLE constant', () => {
        state.loggedUser = { type: UserRoles.GROUP_LEADER_ROLE };
        expect(state.isLeader).toBe(true);
      })
  });

  describe('fullName should return', () => {
    test('empty string if loggedUser is undefined', () => {
      state.loggedUser = undefined;
      expect(state.fullName).toBe('');
    })

    test('empty string if loggedUser is null', () => {
      state.loggedUser = null;
      expect(state.fullName).toBe('');
    })

    test('concatenation of loggedUsers firstname, space and lastname field values', () => {
      state.loggedUser = { type: UserRoles.ADMIN_ROLE, firstname: 'Imenko', lastname: 'Prezimić' };
      expect(state.fullName).toBe('Imenko Prezimić');
    })
  });

  describe('menuItems should return', () => {
    test('only anonymous user menu items if loggedUser is undefined', () => {
      state.loggedUser = undefined;
      expect(state.menuItems).toEqual(MenuItems.anonymous);
    })

    test('only anonymous user menu items if loggedUser is null', () => {
      state.loggedUser = null;
      expect(state.menuItems).toEqual(MenuItems.anonymous);
    })

    test('only anonymous user menu items if loggedUser is an empty object', () => {
      state.loggedUser = {};
      expect(state.menuItems).toEqual(MenuItems.anonymous);
    })

    test('concatenated group leader and anonymous user menu items if loggedUser is a group leader', () => {
      state.loggedUser = { type: UserRoles.GROUP_LEADER_ROLE };
      let expected = MenuItems.anonymous.concat(MenuItems.leader);
      expect(state.menuItems).toEqual(expected);
    })

    test('concatenated admin, group leader and anonymous user menu items if loggedUser is an admin', () => {
      state.loggedUser = { type: UserRoles.ADMIN_ROLE };
      let expected = MenuItems.anonymous.concat(MenuItems.admin);
      expect(state.menuItems).toEqual(expected);
    })
  });

  describe('isViewMode should return', () => {
    test('false if mode is null', () => {
      state.mode = null;
      expect(state.isViewMode).toBe(false);
    })

    test('false if mode is undefined', () => {
      state.mode = null;
      expect(state.isViewMode).toBe(false);
    })

    test('true if mode is UIModes.VIEW', () => {
      state.mode = UIModes.VIEW;
      expect(state.isViewMode).toBe(true);
    })
  })

  describe('isEditMode should return', () => {
    test('false if mode is null', () => {
      state.mode = null;
      expect(state.isEditMode).toBe(false);
    })

    test('false if mode is undefined', () => {
      state.mode = null;
      expect(state.isEditMode).toBe(false);
    })

    test('true if mode is UIModes.EDIT', () => {
      state.mode = UIModes.EDIT;
      expect(state.isEditMode).toBe(true);
    })
  })

  describe('isAddMode should return', () => {
    test('false if mode is null', () => {
      state.mode = null;
      expect(state.isAddMode).toBe(false);
    })

    test('false if mode is undefined', () => {
      state.mode = null;
      expect(state.isAddMode).toBe(false);
    })

    test('true if mode is UIModes.ADD', () => {
      state.mode = UIModes.ADD;
      expect(state.isAddMode).toBe(true);
    })
  })

  describe('isEmailValid should return', () => {
    test('false if editUser is null', () => {
      state.editUser = null;
      expect(state.isEmailValid).toBe(false);
    })

    test('false if editUser is undefined', () => {
      state.editUser = undefined;
      expect(state.isEmailValid).toBe(false);
    })

    test('false if editUser does not have an email field', () => {
      state.editUser = { password: 'asd' };
      expect(state.isEmailValid).toBe(false);
    })

    test('false if editUser has badly formatted email field value', () => {
      state.editUser = { email: 'asd@gmail.c' };
      expect(state.isEmailValid).toBe(false);
    })

    test('true if editUser has correctly formatted email field value', () => {
      state.editUser = { email: 'asd123@gmail.com' };
      expect(state.isEmailValid).toBe(true);
    })
  });

  describe('isFirstnameValid should return', () => {
    test('false if editUser is null', () => {
      state.editUser = null;
      expect(state.isFirstnameValid).toBe(false);
    })

    test('false if editUser is undefined', () => {
      state.editUser = undefined;
      expect(state.isFirstnameValid).toBe(false);
    })

    test('false if editUser does not have an firstname field', () => {
      state.editUser = { email: 'asd123@gmail.com' };
      expect(state.isFirstnameValid).toBe(false);
    })

    test('false if editUser has badly formatted firstname field value', () => {
      state.editUser = { firstname: 'special_characters*all123-around' };
      expect(state.isFirstnameValid).toBe(false);
    })

    test('true if editUser has correctly formatted firstname field value', () => {
      state.editUser = { firstname: 'RandomFirstname' };
      expect(state.isFirstnameValid).toBe(true);
    })
  });

  describe('isLastnameValid should return', () => {
    test('false if editUser is null', () => {
      state.editUser = null;
      expect(state.isLastnameValid).toBe(false);
    })

    test('false if editUser is undefined', () => {
      state.editUser = undefined;
      expect(state.isLastnameValid).toBe(false);
    })

    test('false if editUser does not have an lastname field', () => {
      state.editUser = { email: 'asd123@gmail.com' };
      expect(state.isLastnameValid).toBe(false);
    })

    test('false if editUser has badly formatted lastname field value', () => {
      state.editUser = { lastname: 'special_characters*all123-around' };
      expect(state.isLastnameValid).toBe(false);
    })

    test('true if editUser has correctly formatted lastname field value', () => {
      state.editUser = { lastname: 'RandomLastname' };
      expect(state.isLastnameValid).toBe(true);
    })
  });

  describe('isProfileFormValid should return', () => {
    test('false if editUser is null', () => {
      state.editUser = null;
      expect(state.isProfileFormValid).toBe(false);
    })

    test('false if editUser is undefined', () => {
      state.editUser = undefined;
      expect(state.isProfileFormValid).toBe(false);
    })

    test('false if editUser is an empty object', () => {
      state.editUser = {};
      expect(state.isProfileFormValid).toBe(false);
    })

    test('true if editUser has both password and email fields valid', () => {
      state.editUser = { firstname: 'fn', email: 'name123@yahoo.com', lastname: 'ln'};
      expect(state.isProfileFormValid).toBe(true);
    })
  })

  describe('profileError should return', () => {
    test('non empty string if editUser is null', () => {
      state.editUser = null;
      expect(state.profileError).not.toBe('');
    })

    test('non empty string if editUser is undefined', () => {
      state.editUser = undefined;
      expect(state.profileError).not.toBe('');
    })

    test('non empty string if editUser is an empty object', () => {
      state.editUser = {};
      expect(state.profileError).not.toBe('');
    })

    test('non empty string if editUser is invalid', () => {
      state.editUser = { firstname:'first_name', lastname:'last_name', email: 'email@gmail.c'};
      expect(state.profileError).not.toBe('');
    })

    test('empty string if editUser has both password and email fields valid', () => {
      state.editUser = { firstname:'firstName', lastname:'lastName', email: 'email@gmail.com'};
      expect(state.profileError).toBe('');
    })
  });

  describe('isGroupNameValid should return', () => {
    test('false if editGroup is null', () => {
      state.editGroup = null;
      expect(state.isGroupNameValid).toBe(false);
    })

    test('false if editGroup is undefined', () => {
      state.editGroup = undefined;
      expect(state.isGroupNameValid).toBe(false);
    })

    test('false if editGroup does not have an name field', () => {
      state.editGroup = { description: 'random description' };
      expect(state.isGroupNameValid).toBe(false);
    })

    test('false if editGroup has badly formatted name field value', () => {
      state.editGroup = { name: 'special_characters*all123-around' };
      expect(state.isGroupNameValid).toBe(false);
    })

    test('true if editGroup has correctly formatted name field value', () => {
      state.editGroup = { name: 'Randomname' };
      expect(state.isGroupNameValid).toBe(true);
    })
  })

  describe('isDescriptionValid should return', () => {
    test('false if editGroup is null', () => {
      state.editGroup = null;
      expect(state.isDescriptionValid).toBe(false);
    })

    test('false if editGroup is undefined', () => {
      state.editGroup = undefined;
      expect(state.isDescriptionValid).toBe(false);
    })

    test('false if editGroup does not have an description field', () => {
      state.editGroup = { name: 'groupName' };
      expect(state.isDescriptionValid).toBe(false);
    })

    test('false if editGroup has badly formatted description field value', () => {
      state.editGroup = { description: 'special_characters*all123-around' };
      expect(state.isDescriptionValid).toBe(false);
    })

    test('true if editGroup has correctly formatted description field value', () => {
      state.editGroup = { description: 'Randomname' };
      expect(state.isDescriptionValid).toBe(true);
    })
  })

  describe('isMyGroupFormValid should return', () => {
    test('false if editGroup is null', () => {
      state.editGroup = null;
      expect(state.isMyGroupFormValid).toBe(false);
    })

    test('false if editGroup is undefined', () => {
      state.editGroup = undefined;
      expect(state.isMyGroupFormValid).toBe(false);
    })

    test('false if editGroup is an empty object', () => {
      state.editGroup = {};
      expect(state.isMyGroupFormValid).toBe(false);
    })

    test('true if editGroup has both fields valid', () => {
      state.editGroup = { name: 'name', description: 'some description'};
      expect(state.isMyGroupFormValid).toBe(true);
    })
  })

  describe('groupError should return', () => {
    test('non empty string if editGroup is null', () => {
      state.editGroup = null;
      expect(state.groupError).not.toBe('');
    })

    test('non empty string if editGroup is undefined', () => {
      state.editGroup = undefined;
      expect(state.groupError).not.toBe('');
    })

    test('non empty string if editGroup is an empty object', () => {
      state.editGroup = {};
      expect(state.groupError).not.toBe('');
    })

    test('non empty string if editGroup is invalid', () => {
      state.editGroup = { name:'_name', description: 'random description'};
      expect(state.groupError).not.toBe('');
    })

    test('empty string if editGroup has both password and email fields valid', () => {
      state.editGroup = { name:'Name', description: 'random description'};
      expect(state.groupError).toBe('');
    })
  });
});
