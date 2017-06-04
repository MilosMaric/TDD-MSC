import React from 'react';
import { observer } from 'mobx-react';
import AppState from '../State/AppState';
import MyGroupPageActions from '../Actions/MyGroupPageActions';
import { GroupTypes } from '../Constants/AppConstants';

const MyGroupPage = observer(() => {
  return(
    <div className='ProfilePage'>
      { AppState.anyLogged ?
          <table>
            <tr>
              <th colSpan={2}>
                <label>
                  { AppState.loggedUser.group.type === GroupTypes.ORCHESTRA ?
                    <i className="fa fa-music" aria-hidden="true"></i>
                  :
                    <span>
                      <i className="fa fa-male" aria-hidden="true"></i>
                      <i className="fa fa-female" aria-hidden="true"></i>
                    </span>
                  }
                  {AppState.isViewMode ? '  Moja grupa  ' : '  Uredi grupu  ' }
                  { AppState.loggedUser.group.type === GroupTypes.ORCHESTRA ?
                    <i className="fa fa-music" aria-hidden="true"></i>
                  :
                    <span>
                      <i className="fa fa-female" aria-hidden="true"></i>
                      <i className="fa fa-male" aria-hidden="true"></i>
                    </span>
                  }
                </label>
                {AppState.isViewMode ?
                <span className='EditIcon' onClick={MyGroupPageActions.initEdit}>
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </span>: null }
              </th>
            </tr>
            <tbody>
              <tr>
                <td> <label>Naziv</label> </td>
                <td>
                  {AppState.isViewMode ? AppState.loggedUser.group.name : null }
                  {AppState.isEditMode ? <input type='text' onChange={MyGroupPageActions.handleNameChange} value={AppState.editGroup.name}/> : null }
                </td>
              </tr>
              <tr>
                <td> <label>Opis</label> </td>
                <td>
                  {AppState.isViewMode ? AppState.loggedUser.group.description : null }
                  {AppState.isEditMode ? <input type='text' onChange={MyGroupPageActions.handleDescriptionChange} value={AppState.editGroup.description}/> : null }
                </td>
              </tr>
            </tbody>
              {!AppState.isEditMode ? null :
                <tr className='ButtonRow'>
                  <td colSpan={2}>
                    <button onClick={MyGroupPageActions.handleSubmit} className='FormButton'> Izmeni </button>
                    <button onClick={MyGroupPageActions.handleCancel} className='FormButton'> Otkaži </button>
                  </td>
                </tr>
              }
          </table>
      : null }
    </div>
  );
});

export default MyGroupPage;
