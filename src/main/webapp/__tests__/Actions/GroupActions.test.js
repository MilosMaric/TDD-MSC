import actions, { getAllSC, updateSC } from '../../Actions/GroupActions';
import AppActions from '../../Actions/AppActions';
import ApiActions from '../../Actions/ApiActions';
import AppState from '../../State/AppState';
import GroupState from '../../State/GroupState';
import { UIModes } from '../../Constants/AppConstants';

const mockedCallback = () => {};
jest.mock('../../Actions/AppActions', () => ({
  getSC: jest.fn(() => { return mockedCallback; })
}))

jest.mock('../../Actions/ApiActions', () => ({
  put: jest.fn(),
  get: jest.fn()
}))

describe('GroupActions', () => {

  test('update should call put method from ApiActions with \'api/group\' as first, AppState editGroup as second and returned method from AppActions.getSc method as third argument', () => {
    let editData = { description: 'description', name: 'name' };
    AppState.editGroup = editData;
    actions.update();
    expect(ApiActions.put).toBeCalledWith('api/group', editData, mockedCallback);
  })

  test('updateSC should set AppState mode to view', () => {
    AppState.mode = UIModes.ADD;
    AppState.loggedUser = {};
    updateSC();
    expect(AppState.mode).toEqual(UIModes.VIEW);
  })

  test('updateSC should set AppState mode to view and loggedUser group to edit group', () => {
    let grp = { id: 2, name: 'Izvodjaci' };
    AppState.loggedUser = {};
    AppState.editGroup = grp;
    updateSC();
    expect(AppState.loggedUser.group).toEqual(grp);
  })

  test('getAll should call get method from ApiActions with \'api/group\' as first and returned method from AppActions.getSc method as second argument', () => {
    actions.getAll();
    expect(ApiActions.get).toBeCalledWith('api/group', mockedCallback);
  })

  test('getAllSC should set GroupState data to its parameter value', () => {
    let payload = { f1: 'v1', f2: 3 };
    getAllSC(payload);
    expect(GroupState.data).toEqual(payload);
  })
})
