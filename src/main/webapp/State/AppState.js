import { observable, computed } from 'mobx';
import { UserRoles, MenuItems, UIModes } from '../Constants/AppConstants'
import RegExpValidation from '../Utils/RegExpValidation';

let state = observable({
  loggedUser: undefined,
  get anyLogged() { return this.loggedUser ? true : false; },
  get isAdmin() { return this.anyLogged && this.loggedUser.type === UserRoles.ADMIN_ROLE; },
  get isLeader() { return this.anyLogged && this.loggedUser.type === UserRoles.GROUP_LEADER_ROLE; },
  get fullName() { return this.anyLogged ? this.loggedUser.firstname + ' ' + this.loggedUser.lastname : ''; },
  get menuItems() {
    let menuItems = MenuItems.anonymous;
    if(this.isLeader) {
      menuItems = menuItems.concat(MenuItems.leader);
    } else if(this.isAdmin) {
      menuItems = menuItems.concat(MenuItems.admin);
    }
    return menuItems;
  },

  error: {},

  mode: UIModes.VIEW,
  get isViewMode() { return this.mode && this.mode === UIModes.VIEW ? true : false; },
  get isEditMode() { return this.mode && this.mode === UIModes.EDIT ? true : false; },
  get isAddMode() { return this.mode && this.mode === UIModes.ADD ? true : false; },

  editUser: {},
  get isEmailValid() { return this.editUser ? RegExpValidation.isEmail(this.editUser.email): false; },
  get isFirstnameValid() { return this.editUser ? RegExpValidation.isLettersSr(this.editUser.firstname): false; },
  get isLastnameValid() { return this.editUser ? RegExpValidation.isLettersSr(this.editUser.lastname): false; },
  get isProfileFormValid() { return this.isEmailValid && this.isLastnameValid && this.isFirstnameValid; },
  get profileError() {
    let error = '';
    if(!this.isEmailValid) {
        error += 'Email nije u dobrom formatu. ';
    }
    if(!this.isFirstnameValid) {
        error += 'Ime mora biti popunjeno i sadržati samo slova. ';
    }

    if(!this.isLastnameValid) {
        error += 'Prezime mora biti popunjeno i sadržati samo slova. ';
    }
    return error;
  },

  editGroup: {},
  get isGroupNameValid() { return this.editGroup ? RegExpValidation.isLettersSr(this.editGroup.name): false; },
  get isDescriptionValid() { return this.editGroup ? RegExpValidation.isLettersSr(this.editGroup.description): false; },
  get isMyGroupFormValid() { return this.isGroupNameValid && this.isDescriptionValid; },
  get groupError() {
    if(!this.isMyGroupFormValid) {
        return 'Naziv i opis moraju biti popunjeni i sadržati samo slova.';
    }
    return '';
  }
});

window.state = state;
export default state;
