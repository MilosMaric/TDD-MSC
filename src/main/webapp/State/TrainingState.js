import { observable, computed } from 'mobx';
import RegExpValidation from '../Utils/RegExpValidation';
import AppState from './AppState';

let state = observable({
  data: [],
  get exist() { return this.data && this.data.length ? true : false; },

  canceled: undefined,
  day: 0,
  get filtered() {
    let filteredTrainings = this.data;
    if(AppState.isLeader) {
      filteredTrainings = this.data.filter((item) => { return item.group.id === AppState.loggedUser.group.id; });
    }

    if(this.canceled !== undefined) {
        filteredTrainings = filteredTrainings.filter((item) => { return item.isCanceled === this.canceled; });
    }

    if(this.day > 0) {
      filteredTrainings = filteredTrainings.filter((item) => { return new Date(item.time).getDay() === this.day; });
    }

    return filteredTrainings;
  },
});

window.trainingState = state;
export default state;
