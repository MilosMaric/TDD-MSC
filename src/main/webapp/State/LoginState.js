import { observable, computed } from 'mobx';
import RegExpValidation from '../Utils/RegExpValidation';

let state = observable({
  data: {},
  get isEmailValid() { return this.data ? RegExpValidation.isEmail(this.data.email): false; },
  get isPasswordValid() { return this.data ? RegExpValidation.isLettersOrNumbers(this.data.password): false; },
  get isFormValid() { return this.isEmailValid && this.isPasswordValid; },
  get error() {
    let error = '';
    if(!this.isEmailValid) {
        error += 'Email nije u dobrom formatu. ';
    }
    if(!this.isPasswordValid) {
        error += 'Lozinka mora biti popunjena i sadržati samo slova i brojeve.';
    }
    return error;
  }
});

window.loginState = state;
export default state;
