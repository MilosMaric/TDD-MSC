import React from 'react';
import { observer } from 'mobx-react';
import AppState from '../State/AppState';
import { Link, browserHistory } from 'react-router';
import UserActions from '../Actions/UserActions';

const MainMenu = observer(() => {
  let isUserLogged = AppState.anyLogged;
  return (
    <div className='MainMenu'>
      {AppState.menuItems.map((item, index) => {
        return ( <Link key={index} to={item.to} className='MenuItem'> {item.text} </Link> );
      })}
      {isUserLogged ?
        <span className='RightMenuItem'>
          <Link className='LogIcon' to='/login' onClick={UserActions.logout}>
            <i className="fa fa-sign-out" aria-hidden="true"></i>
          </Link>
          <Link className='ProfileIcon' to='/profile'>
            <i className="fa fa-user" aria-hidden="true"></i> { AppState.fullName}
          </Link>
        </span>
      :
        <span className='RightMenuItem'>
          <Link className='LogIcon' to='/login'>
            <i className="fa fa-sign-in" aria-hidden="true"></i>
          </Link>
        </span>
      }
    </div>
  );
});

export default MainMenu;
