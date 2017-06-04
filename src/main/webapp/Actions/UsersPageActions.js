import AppState from '../State/AppState';
import UserState from '../State/UserState';
import { UIModes } from '../Constants/AppConstants';
import Cloner from '../Utils/Cloner';
import UserActions from './UserActions';
import GroupActions from './GroupActions';
import AppActions from './AppActions';

export default {
  initAdd: () => {
    GroupActions.getAll();
    AppState.mode = UIModes.ADD;
  },

  handleCancel: () => {
    AppState.mode = UIModes.VIEW;
    UserState.newUser = {};
  },

  handleSubmit: () => {
    if(UserState.isFormValid) {
      UserActions.add();
    } else {
      AppActions.error(UserState.error);
    }
  },

  handleFirstnameChange: (e) => {
    genericHandle(e, 'firstname');
  },

  handleLastnameChange: (e) => {
    genericHandle(e, 'lastname');
  },

  handleEmailChange: (e) => {
    genericHandle(e, 'email');
  },

  handlePasswordChange: (e) => {
    genericHandle(e, 'password');
  },

  handleGroupChange: (e) => {
    let val = e.target.value;
    if(!val) {
      delete UserState.newUser.group;
    } else {
      UserState.newUser.group = { id: val };
    }
  },
};

const genericHandle = (e, fieldName) => {
  let val = e.target.value;
  if(!val || (typeof val === 'string' && !val.trim())) {
    delete UserState.newUser[fieldName];
  } else {
    UserState.newUser[fieldName] = val.trim();
  }
};
