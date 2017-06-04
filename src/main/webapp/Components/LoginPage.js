import React from 'react';
import { observer } from 'mobx-react';
import LoginPageActions from '../Actions/LoginPageActions';

const LoginPage = () => {
  return(
    <div className="LoginPage">
      <div className="FormRow">
        <label> Email: </label> <br/>
        <input type="text" onChange={LoginPageActions.handleEmailChange}/>
      </div>
      <div className="FormRow">
        <label> Lozinka: </label> <br/>
        <input type="password" onChange={LoginPageActions.handlePasswordChange}/>
      </div>
      <div className="FormRow">
        <button onClick={LoginPageActions.handleSubmit}> <i className="fa fa-sign-in" aria-hidden="true"></i> Login </button>
      </div>
    </div>
  );
};

export default LoginPage;
