import React from 'react';
import { observer } from 'mobx-react';
import TrainingState from '../State/TrainingState';
import AppState from '../State/AppState';
import GroupState from '../State/GroupState';
import TrainingPageActions from '../Actions/TrainingPageActions';
import {GroupTypes, TrainingTypes} from '../Constants/AppConstants';

const TrainingsPage = observer(() => {
  return(
    <div className='TrainingPage'>
      {AppState.isViewMode ?
        <div className='ViewContainer'>
            <div className='FilterContainer'>
              <div className='CancelFilterContainer'>
                <select onChange={TrainingPageActions.handleCancelFilterSelectionChange}>
                  <option value='all'>Sve</option>
                  <option value='canceled'>Samo otkazane</option>
                  <option value='not canceled'>Samo neotkazane</option>
                </select>
              </div>
              <div className='DayFilterContainer'>
                <select onChange={TrainingPageActions.handleDayFilterSelectionChange}>
                  <option value='ALL'>Svi dani</option>
                  <option value='MONDAY'>Ponedeljak</option>
                  <option value='TUESDAY'>Utorak</option>
                  <option value='WEDNESDAY'>Sreda</option>
                  <option value='THURSDAY'>Četvrtak</option>
                  <option value='FRIDAY'>Petak</option>
                </select>
              </div>
            </div>
            <table>
              <tr>
                <th><label>#</label></th>
                <th><label>Datum i vreme</label></th>
                <th><label>Grupa</label></th>
                <th><label>Markeri</label></th>
                {AppState.anyLogged ? <th><label>Operacije</label></th> : null }
              </tr>
              <tbody>
                {TrainingState.filtered.map((item, idx)=>{
                  let time = new Date(item.time);
                  let faType = item.type === TrainingTypes.INDIVIDUAL ? 'exclamation' : 'repeat';
                  let faCanceled = item.isCanceled ? 'times' : 'check';
                  return (
                    <tr key={idx}>
                      <td>{idx+1 + '.'}</td>
                      <td>{time.toLocaleDateString('sr-rs') + ' ' + time.getHours() + ':' + (time.getMinutes() === 0 ? '00' : time.getMinutes())}</td>
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
                      <td>
                          <i className={"fa fa-" + faCanceled} aria-hidden="true"></i>
                          {' '}
                          <i className={"fa fa-" + faType} aria-hidden="true"></i>
                      </td>
                      {AppState.anyLogged ? <td>
                        <button onClick={ (e) => { TrainingPageActions.handleCancelTraining(item); }}>
                          { item.isCanceled ? 'Ponovo zakaži' : 'Otkaži' }
                        </button>
                      </td>  : null }
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
      : null}
    </div>
  );
});

export default TrainingsPage;
