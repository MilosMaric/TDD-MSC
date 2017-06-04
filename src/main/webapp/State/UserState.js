import { observable, computed } from 'mobx';
import RegExpValidation from '../Utils/RegExpValidation';

let state = observable({
  data: [],
  get exist() { return this.data && this.data.length ? true : false; },

  newUser: {},
  get isFormValid() {
    return this.newUser &&
    RegExpValidation.isEmail(this.newUser.email) &&
    RegExpValidation.isLettersOrNumbers(this.newUser.password) &&
    RegExpValidation.isLettersSr(this.newUser.firstname) &&
    RegExpValidation.isLettersSr(this.newUser.lastname) &&
    this.newUser.group && this.newUser.group.id > 0 ? true : false;
  },
  get error() {
    if(!this.isFormValid) { return 'Forma nije validna.'; }
    return '';
  }
});

window.userState = state;
export default state;
