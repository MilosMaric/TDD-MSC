import { observable, computed } from 'mobx';

let state = observable({
  data: []
});

window.groupState = state;
export default state;
