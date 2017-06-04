import AppState from '../State/AppState';
import { UIModes } from '../Constants/AppConstants';
import Cloner from '../Utils/Cloner';
import UserActions from './UserActions';
import AppActions from './AppActions';

export default {
  initEdit: () => {
    AppState.mode = UIModes.EDIT;
    AppState.editUser = Cloner.clone(AppState.loggedUser);
  },

  handleCancel: () => {
    AppState.mode = UIModes.VIEW;
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

  handleSubmit: () => {
    if(AppState.isProfileFormValid) {
      UserActions.update();
    } else {
      AppActions.error(AppState.profileError);
    }
  },
};

const genericHandle = (e, fieldName) => {
  let val = e.target.value;
  if(!val || (typeof val === 'string' && !val.trim())) {
    delete AppState.editUser[fieldName];
  } else {
    AppState.editUser[fieldName] = val.trim();
  }
};
