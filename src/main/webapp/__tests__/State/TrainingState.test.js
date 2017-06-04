import state from '../../State/TrainingState';
import AppState from '../../State/AppState';
import { UserRoles, Days } from '../../Constants/AppConstants'

describe('TrainingState', () => {

  describe('exist should return', () => {
    test('false if data is null', () => {
      state.data = null;
      expect(state.exist).toBe(false);
    })

    test('false if data is undefined', () => {
      state.data = undefined;
      expect(state.exist).toBe(false);
    })

    test('false if data is an empty array', () => {
      state.data = [];
      expect(state.exist).toBe(false);
    })

    test('true if data is a non empty array', () => {
      state.data = [{ description: 'desc' }];
      expect(state.exist).toBe(true);
    })
  })

  describe('filtered should return', () => {
    test('only logged leaders group if a leader is logged', () => {
      state.data = [
        { group: { id: 2 } },
        { group: { id: 2 } },
        { group: { id: 2 } },
        { group: { id: 3 } }
      ];
      setupState({ type: UserRoles.GROUP_LEADER_ROLE, group: { id: 2 } }, undefined);
      expect(state.filtered.length).toBe(3);
    })

    test('only canceled group trainings if leader is logged and canceled is checked', () => {
      state.data = [
        { group: { id: 6 }, isCanceled:true},
        { group: { id: 6 }, isCanceled:true},
        { group: { id: 6 }, isCanceled:false},
        { group: { id: 5 }, isCanceled:true}
      ];
      setupState({ type: UserRoles.GROUP_LEADER_ROLE, group: { id: 6 } }, true);
      expect(state.filtered.length).toBe(2);
    })

    test('only canceled trainings if no one is logged and canceled is checked', () => {
      state.data = [
        { group: { id: 6 }, isCanceled:true, time: 1499940000000},
        { group: { id: 6 }, isCanceled:true, time: 1499940000000},
        { group: { id: 6 }, isCanceled:false, time: 1499940000000},
      ];
      setupState({ type: UserRoles.ADMIN_ROLE }, true, Days.THURSDAY);
      expect(state.filtered.length).toBe(2);
    })
  })
});

const setupState = (user, canceled, day) => {
  AppState.loggedUser = user;
  state.canceled = canceled;
  state.day = day > 0 ? day : 0;
}
