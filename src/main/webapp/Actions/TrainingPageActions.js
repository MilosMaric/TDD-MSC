import AppState from '../State/AppState';
import TrainingState from '../State/TrainingState';
import TrainingActions from './TrainingActions';
import { UIModes } from '../Constants/AppConstants';
import Cloner from '../Utils/Cloner';
import AppActions from './AppActions';
import {Days} from '../Constants/AppConstants';

export default {
  handleCancelTraining: (item) => {
    TrainingActions.toggleStatus(item);
  },

  handleCancelFilterSelectionChange: (e) => {
    let val = e.target.value;
    if(val === 'all') {
        TrainingState.canceled = undefined;
    } else {
      TrainingState.canceled = val === 'canceled';
    }
  },

  handleDayFilterSelectionChange: (e) => {
    let val = e.target.value;
    TrainingState.day = Days[val];
  },
};
