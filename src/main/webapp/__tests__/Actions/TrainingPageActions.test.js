import TrainingActions from '../../Actions/TrainingActions'
import TrainingPageActions from '../../Actions/TrainingPageActions'
import TrainingState from '../../State/TrainingState'
import {Days} from '../../Constants/AppConstants'

jest.mock('../../Actions/TrainingActions', () => ({
  toggleStatus: jest.fn()
}))

describe('TrainingPageActions', () => {
  test('handleCancelTraining should call toggleStatus method of TrainingActions with the same param', () => {
    let param = { f : 'v'};
    TrainingPageActions.handleCancelTraining(param);
    expect(TrainingActions.toggleStatus).toBeCalledWith(param);
  })

  test('handleCancelFilterSelectionChange should set TrainingState.canceled to undefined if event.target.value is \'all\'', () => {
    TrainingState.canceled = 'asd';
    TrainingPageActions.handleCancelFilterSelectionChange({ target: {value: 'all'}});
    expect(TrainingState.canceled).toBeUndefined();
  })

  test('handleCancelFilterSelectionChange should set TrainingState.canceled to true if event.target.value is \'canceled\'', () => {
    TrainingState.canceled = false;
    TrainingPageActions.handleCancelFilterSelectionChange({ target: {value: 'canceled'}});
    expect(TrainingState.canceled).toBe(true);
  })

  test('handleCancelFilterSelectionChange should set TrainingState.canceled to true if event.target.value is \'not canceled\'', () => {
    TrainingState.canceled = true;
    TrainingPageActions.handleCancelFilterSelectionChange({ target: {value: 'not canceled'}});
    expect(TrainingState.canceled).toBe(false);
  })

  test('handleDayFilterSelectionChange should set TrainingState.day to value for index of e.target.value in Days constant', () => {
    TrainingState.day = 0;
    TrainingPageActions.handleDayFilterSelectionChange({ target: {value: 'MONDAY'}});
    expect(TrainingState.day).toBe(Days['MONDAY']);
  })
})
