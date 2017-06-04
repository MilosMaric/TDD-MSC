import React from "react";
import { observer } from 'mobx-react';
import AppState from "../../State/AppState";
import NotificationSystem from "react-notification-system";

let nS;
const onAddCallback = () => { AppState.error = ''; };

const Notificatior = observer(() => {
  let error = AppState.error;
  nS && error ? nS.addNotification(error) : null;

  return (
    <NotificationSystem ref={(nSys) => { nS = nSys; }}/>
  );
});

export default Notificatior;
