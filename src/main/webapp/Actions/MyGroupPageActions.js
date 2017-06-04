import AppState from '../State/AppState';
import { UIModes } from '../Constants/AppConstants';
import Cloner from '../Utils/Cloner';
import GroupActions from './GroupActions';
import AppActions from './AppActions';

export default {
  initEdit: () => {
    AppState.mode = UIModes.EDIT;
    AppState.editGroup = Cloner.clone(AppState.loggedUser.group);
  },

  handleCancel: () => {
    AppState.mode = UIModes.VIEW;
  },

  handleNameChange: (e) => {
    genericHandle(e, 'name');
  },

  handleDescriptionChange: (e) => {
    genericHandle(e, 'description');
  },

  handleSubmit: () => {
    if(AppState.isMyGroupFormValid) {
      GroupActions.update();
    } else {
      AppActions.error(AppState.groupError);
    }
  },
};

const genericHandle = (e, fieldName) => {
  let val = e.target.value;
  if(!val || (typeof val === 'string' && !val.trim())) {
    delete AppState.editGroup[fieldName];
  } else {
    AppState.editGroup[fieldName] = val.trim();
  }
};
