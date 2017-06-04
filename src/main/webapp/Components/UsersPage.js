import React from 'react';
import { observer } from 'mobx-react';
import UserState from '../State/UserState';
import AppState from '../State/AppState';
import GroupState from '../State/GroupState';
import UsersPageActions from '../Actions/UsersPageActions';
import {GroupTypes} from '../Constants/AppConstants';

const UsersPage = observer(() => {
  return(
    <div className='UsersPage'>
      {AppState.isViewMode ?
        <div className='ViewContainer'>
            <button onClick={UsersPageActions.initAdd}>Dodaj novog rukovodioca</button> <br/>
            <table>
              <tr>
                <th><label>#</label></th>
                <th><label>Ime i prezime</label></th>
                <th><label>Email</label></th>
                <th><label>Grupa</label></th>
              </tr>
              <tbody>
                {UserState.data.map((item, idx)=>{
                  return (
                    <tr key={idx}>
                      <td>{idx+1 + '.'}</td>
                      <td>{item.firstname + ' ' + item.lastname}</td>
                      <td>{item.email}</td>
                      <td>
                        { item.group.type === GroupTypes.ORCHESTRA ?
                          <i className="fa fa-music" aria-hidden="true"></i>
                        :
                          <span>
                            <i className="fa fa-male" aria-hidden="true"></i>
                            <i className="fa fa-female" aria-hidden="true"></i>
                          </span>
                        }
                        {' ' + item.group.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
      : null}
      {AppState.isAddMode ?
        <table className='AddForm'>
          <tr>
            <th colSpan={2}>
              <label> Novi rukovodilac </label>
            </th>
          </tr>
          <tbody>
            <tr>
              <td> <label>Ime</label> </td>
              <td>
                <input type='text' onChange={UsersPageActions.handleFirstnameChange}/>
              </td>
            </tr>
            <tr>
              <td> <label>Prezime</label> </td>
              <td>
                <input type='text' onChange={UsersPageActions.handleLastnameChange}/>
              </td>
            </tr>
            <tr>
              <td> <label>Email</label> </td>
              <td>
                <input type='text' onChange={UsersPageActions.handleEmailChange}/>
              </td>
            </tr>
            <tr>
              <td> <label>Lozinka</label> </td>
              <td>
                <input type='text' onChange={UsersPageActions.handlePasswordChange}/>
              </td>
            </tr>
            <tr>
              <td> <label>Grupa</label> </td>
              <td>
                <select onChange={UsersPageActions.handleGroupChange}>
                  <option selected disabled hidden value={-1}> Odaberite grupu </option>
                  {GroupState.data.map((grp, index) => {
                      return (
                        <option key={index} value={grp.id}> {grp.name} </option>
                      );
                    })
                  }
                </select>
              </td>
            </tr>
          </tbody>
            <tr className='ButtonRow'>
              <td colSpan={2}>
                <button onClick={UsersPageActions.handleSubmit} className='FormButton'> Dodaj </button>
                <button onClick={UsersPageActions.handleCancel} className='FormButton'> Otkaži </button>
              </td>
            </tr>
        </table>
      : null}
    </div>
  );
});

export default UsersPage;
