import React from 'react';
import { observer } from 'mobx-react';
import AppState from '../State/AppState';
import ProfilePageActions from '../Actions/ProfilePageActions';

const ProfilePage = observer(() => {
  return(
    <div className='ProfilePage'>
      { AppState.anyLogged ?
          <table>
            <tr>
              <th colSpan={2}>
                <label> {AppState.isViewMode ? 'Moj profil' : 'Uredi profil' } </label>
                {AppState.isViewMode ?
                <span className='EditIcon' onClick={ProfilePageActions.initEdit}>
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </span>: null }
              </th>
            </tr>
            <tbody>
              <tr>
                <td> <label>Ime</label> </td>
                <td>
                  {AppState.isViewMode ? AppState.loggedUser.firstname : null }
                  {AppState.isEditMode ? <input type='text' onChange={ProfilePageActions.handleFirstnameChange} value={AppState.editUser.firstname}/> : null }
                </td>
              </tr>
              <tr>
                <td> <label>Prezime</label> </td>
                <td>
                  {AppState.isViewMode ? AppState.loggedUser.lastname : null }
                  {AppState.isEditMode ? <input type='text' onChange={ProfilePageActions.handleLastnameChange} value={AppState.editUser.lastname}/> : null }
                </td>
              </tr>
              <tr>
                <td> <label>Email</label> </td>
                <td>
                  {AppState.isViewMode ? AppState.loggedUser.email : null }
                  {AppState.isEditMode ? <input type='text' onChange={ProfilePageActions.handleEmailChange} value={AppState.editUser.email}/> : null }
                </td>
              </tr>
            </tbody>
              {!AppState.isEditMode ? null :
                <tr className='ButtonRow'>
                  <td colSpan={2}>
                    <button onClick={ProfilePageActions.handleSubmit} className='FormButton'> Izmeni </button>
                    <button onClick={ProfilePageActions.handleCancel} className='FormButton'> Otkaži </button>
                  </td>
                </tr>
              }
          </table>
      : null }
    </div>
  );
});

export default ProfilePage;
