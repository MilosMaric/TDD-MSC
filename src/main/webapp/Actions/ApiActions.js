import $ from "jquery";
import AppActions from './AppActions';

const ApiActions = {
  get : function(url, successCallback, errorCallback) {
    genericServerCall("GET", url, successCallback, errorCallback);
  },

  post : function(url, payload, successCallback, errorCallback) {
    genericServerCall("POST", url, successCallback, errorCallback, payload);
  },

  put : function(url, payload, successCallback, errorCallback) {
    genericServerCall("PUT", url, successCallback, errorCallback, payload);
  },

  delete : function(url, successCallback, errorCallback) {
    genericServerCall("DELETE", url, successCallback, errorCallback);
  },

  upload : function(url, file, successCallback, errorCallback) {
    fileUpload(url, successCallback, errorCallback, file);
  },
}

const getHeaders = function() {
  let jwt = localStorage.getItem("jwt");
  let headers;

  if(jwt && jwt.length) {
    headers = { Authorization: jwt };
  }

  return headers;
}

const genericServerCall = function(type, url, successCallback, errorCallback, payload) {
  let headers = getHeaders();
  let ajaxConfig = {
    type: type,
    url: url,
    dataType: "text json",
    contentType: "application/json",
    processData: false,
    success: function(data) {
      if(successCallback) {
        successCallback(data);
      }
    },

    error: function(xhr) {
      if(errorCallback) {
        errorCallback();
      } else {
        genericErrorCallback(xhr);
      }
    }
  };

  if(headers) {
    ajaxConfig.headers = headers;
  }

  if(payload) {
    ajaxConfig.data = JSON.stringify(payload);
  }

  $.ajax(ajaxConfig);
}

const fileUpload = function(url, successCallback, errorCallback, data) {
  $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: url,
        data: data,
        contentType: false,
        processData: false, //prevent jQuery from automatically transforming the data into a query string
        cache: false,
        timeout: 600000,
        success: function (data) {
          if(successCallback) {
            successCallback(data);
          }
        },
        error: function (xhr) {
          if(errorCallback) {
            errorCallback();
          } else {
            genericErrorCallback(xhr);
          }
        }
    });

}

const genericErrorCallback = function(xhr) {
  AppActions.error("Server error.");
}

export default ApiActions;
