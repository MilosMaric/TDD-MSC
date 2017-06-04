import AppState from '../State/AppState';

const AppActions = {
  error: (msg) => {
    triggerNotification(msg, 'error');
  },
  warning: (msg) => {
    triggerNotification(msg, 'warning');
  },

  getSC: (sc) => {
    return (data) => {
      if(data.operationSuccedded) {
        sc(data.payload);
      } else {
        AppActions.error(data.errorMessage);
      }
    };
  }
};

const triggerNotification = (msg, level) => {
  if(msg && typeof msg === 'string' && msg.trim().length) {
    AppState.error = {
      level: level,
      message: msg
    };
  }
};

export default AppActions;
