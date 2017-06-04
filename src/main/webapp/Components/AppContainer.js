import React from "react";
import { observer } from 'mobx-react';
import MainMenu from "./MainMenu";
import AppActions from '../Actions/AppActions';
import { UserRoles } from '../Constants/AppConstants';
import Notificatior from "./Shared/Notificatior";

const AppContainer = observer(({children}) => {
  return (
    <div>
      <MainMenu/>
      <Notificatior/>
      <div className='AppContent'>{children}</div>
    </div>
  );
});

export default AppContainer;
