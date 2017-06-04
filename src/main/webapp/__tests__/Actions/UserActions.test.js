import actions, { getLoggedSC, getLeadersSC, loginSC, updateSC, addSC } from '../../Actions/UserActions';
import AppActions from '../../Actions/AppActions';
import ApiActions from '../../Actions/ApiActions';
import LoginState from '../../State/LoginState';
import UserState from '../../State/UserState';
import AppState from '../../State/AppState';
import { UIModes } from '../../Constants/AppConstants'
import { browserHistory } from 'react-router';

const mockedCallback = () => {};

jest.mock('../../Actions/AppActions', () => ({
  getSC: jest.fn(() => { return mockedCallback; })
}))

jest.mock('../../Actions/ApiActions', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn()
}))

describe('UserActions', () => {

  test('getLogged should call get method from ApiActions with \'api/user/getLoggedUser\' as first and returned method from AppActions.getSc method as second argument', () => {
    actions.getLogged();
    expect(ApiActions.get).toBeCalledWith('api/user/getLoggedUser', mockedCallback);
  })

  test('getLoggedSC should set AppState loggedUser to its parameter value', () => {
    let loggedUserInfo = { id: 2, firstname: 'Imenko', lastname: 'Prezimić' };
    AppState.loggedUser = {};
    getLoggedSC(loggedUserInfo);
    expect(AppState.loggedUser).toEqual(loggedUserInfo);
  })

  test('login should call post method from ApiActions with \'api/user/login\' as first, LoginState data as second and returned method from AppActions.getSc method as third argument', () => {
    let loginData = { email: 'exapmple@gmail.com', password: 'examplePassword' };
    LoginState.data = loginData;
    actions.login();
    expect(ApiActions.post).toBeCalledWith('api/user/login', loginData, mockedCallback);
  })

  test('', () => {
    actions.getLogged();
    expect(ApiActions.get).toBeCalledWith('api/user/getLoggedUser', mockedCallback);
  })

  test('update should call put method from ApiActions with \'api/user\' as first, AppState editUser as second and returned method from AppActions.getSc method as third argument', () => {
    let editData = { firstname: 'fname', email: 'name123@yahoo.com', lastname: 'lname'};
    AppState.editUser = editData;
    actions.update();
    expect(ApiActions.put).toBeCalledWith('api/user', editData, mockedCallback);
  })

  test('updateSC should set AppState mode to view', () => {
    AppState.editUser = {};
    AppState.mode = UIModes.ADD;
    updateSC();
    expect(AppState.mode).toBe(UIModes.VIEW);
  })

  test('updateSC should set AppState loggedUser to its editUser info', () => {
    let data = { id: 3, name: 'SomeName' };
    AppState.editUser = data;
    updateSC();
    expect(AppState.loggedUser).toEqual(data);
  })

  test('getLeaders should call get method from ApiActions with \'api/user/leaders\' as first and returned method from AppActions.getSc method as second argument', () => {
    actions.getLeaders();
    expect(ApiActions.get).toBeCalledWith('api/user/leaders', mockedCallback);
  })

  test('getLeadersSC should set UserState data to its parameter value', () => {
    let data = { id: 3, name: 'SomeName' };
    UserState.data = [];
    getLeadersSC(data);
    expect(UserState.data).toEqual(data);
  })

  test('add should call post method from ApiActions with \'api/user\' as first, UserState newUser as second and returned method from AppActions.getSc method as third argument', () => {
    let userData = { firstname: 'fname', email: 'name123@yahoo.com', lastname: 'lname'};
    UserState.newUser = userData;
    actions.add();
    expect(ApiActions.post).toBeCalledWith('api/user', userData, mockedCallback);
  })

  test('addSC should set AppState mode to view', () => {
    AppState.mode = UIModes.ADD;
    addSC();
    expect(AppState.mode).toBe(UIModes.VIEW);
  })

  test('addSC should set UserState newUser to an empty object', () => {
    AppState.mode = UIModes.ADD;
    addSC();
    expect(UserState.newUser).toEqual({});
  })

  test('logout should set AppState loggedUser to undefined', () => {
    AppState.loggedUser = {};
    actions.logout();
    expect(AppState.loggedUser).toBeUndefined();
  })

  test('logout should remove \'jwt\' item from localStorage', () => {
    localStorage.setItem('jwt', 'alsihdlaskjhd.ajhlsdkjahsldjka.uhiuhlkjfnb8938');
    actions.logout();
    expect(localStorage.getItem('jwt')).toBeUndefined();
  })

  test('login should add parameter value to \'jwt\' item in localStorage', () => {
    browserHistory.push = jest.fn();
    localStorage.clear();
    let jwt = 'jd812j3dij.j0f9h10vh130.jj9f029jf09';
    loginSC(jwt);
    expect(localStorage.getItem('jwt')).toEqual(jwt);
  })

  test('login should call react-router browserHistorys push method with \'/profile\' path', () => {
    browserHistory.push = jest.fn();
    loginSC('');
    expect(browserHistory.push).toBeCalledWith('/profile');
  })
})
