import { browserHistory } from 'react-router'
import AppState from '../State/AppState';
import GroupState from '../State/GroupState';
import ApiActions from './ApiActions';
import AppActions from './AppActions';
import { UIModes } from '../Constants/AppConstants'
import Cloner from '../Utils/Cloner'

const ctrlUrl = 'api/group';

const GroupActions = {
  update: () => {
    ApiActions.put(ctrlUrl, AppState.editGroup, AppActions.getSC(updateSC));
  },

  getAll: () => {
    ApiActions.get(ctrlUrl, AppActions.getSC(getAllSC));
  }
}

export default GroupActions;

let getAllSC = (payload) => {
  GroupState.data = payload;
}

let updateSC = () => {
  AppState.mode = UIModes.VIEW;
  AppState.loggedUser.group = Cloner.clone(AppState.editGroup);
}

export { getAllSC, updateSC }
