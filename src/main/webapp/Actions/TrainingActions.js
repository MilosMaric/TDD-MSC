import AppState from '../State/AppState';
import TrainingState from '../State/TrainingState';
import ApiActions from './ApiActions';
import AppActions from './AppActions';
import { UIModes } from '../Constants/AppConstants'
import Cloner from '../Utils/Cloner'

const ctrlUrl = 'api/training';

const TrainingActions = {
  itemToToggle : {},
  getAll: () => {
    ApiActions.get(ctrlUrl, AppActions.getSC(getAllSC));
  },

  toggleStatus: (item) => {
    TrainingActions.itemToToggle = item;
    ApiActions.put(ctrlUrl + '/' + item.id + '/toggleStatus', {}, AppActions.getSC(toggleStatusSC));
  },
}

export default TrainingActions;

let getAllSC = (payload) => {
    TrainingState.data = payload;
};

let toggleStatusSC = (payload) => {
  TrainingActions.itemToToggle.isCanceled = !TrainingActions.itemToToggle.isCanceled;
};

export { getAllSC, toggleStatusSC }
