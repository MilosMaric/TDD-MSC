import { browserHistory } from 'react-router'
import AppState from '../State/AppState';
import LoginState from '../State/LoginState';
import UserState from '../State/UserState';
import ApiActions from './ApiActions';
import AppActions from './AppActions';
import { UIModes } from '../Constants/AppConstants'
import Cloner from '../Utils/Cloner'

const ctrlUrl = 'api/user';

const UserActions = {
  getLogged: () => {
    ApiActions.get(ctrlUrl + "/getLoggedUser", AppActions.getSC(getLoggedSC));
  },

  getLeaders: () => {
    ApiActions.get(ctrlUrl + "/leaders", AppActions.getSC(getLeadersSC));
  },

  login: () => {
    ApiActions.post(ctrlUrl + "/login", LoginState.data, AppActions.getSC(loginSC));
  },

  update: () => {
    ApiActions.put(ctrlUrl, AppState.editUser, AppActions.getSC(updateSC));
  },

  add: () => {
    ApiActions.post(ctrlUrl, UserState.newUser, AppActions.getSC(addSC));
  },

  logout: () => {
    localStorage.removeItem("jwt");
    AppState.loggedUser = undefined;
  }
}

export default UserActions;

let getLoggedSC = (payload) => {
  AppState.loggedUser = payload;
}

let getLeadersSC = (payload) => {
  UserState.data = payload;
}

let loginSC = (payload) => {
  localStorage.setItem('jwt', payload);
  browserHistory.push("/profile");
}

let updateSC = (payload) => {
  AppState.mode = UIModes.VIEW;
  AppState.loggedUser = Cloner.clone(AppState.editUser);
}

let addSC = (payload) => {
  UserActions.getLeaders();
  AppState.mode = UIModes.VIEW;
  UserState.newUser = {};
}

export { getLoggedSC, getLeadersSC, loginSC, updateSC, addSC };
