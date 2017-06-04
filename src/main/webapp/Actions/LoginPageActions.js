import UserActions from './UserActions';
import AppActions from './AppActions';
import state from '../State/LoginState';

export default {
  handleEmailChange: (e) => {
    genericHandle(e, 'email');
  },

  handlePasswordChange: (e) => {
    genericHandle(e, 'password');
  },

  handleSubmit: () => {
    if(state.isFormValid) {
      UserActions.login();
    } else {
      AppActions.error(state.error);
    }
  },
};

const genericHandle = (e, fieldName) => {
  let val = e.target.value;
  if(!val || (typeof val === 'string' && !val.trim())) {
    delete state.data[fieldName];
  } else {
    state.data[fieldName] = val.trim();
  }
};
