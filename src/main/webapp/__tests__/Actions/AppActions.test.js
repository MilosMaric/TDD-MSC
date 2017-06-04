import actions from '../../Actions/AppActions';
import AppState from '../../State/AppState';

describe('AppActions', () => {

  describe('error should', () => {
    test('not change AppState error property if msg is null', () => {
      let expected = clone(AppState.error);
      actions.error(null);
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is undefined', () => {
      let expected = clone(AppState.error);
      actions.error(undefined);
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is an empty string', () => {
      let expected = clone(AppState.error);
      actions.error('');
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is an empty string', () => {
      let expected = clone(AppState.error);
      actions.error('  ');
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is a number', () => {
      let expected = clone(AppState.error);
      actions.error(123);
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is a boolean value', () => {
      let expected = clone(AppState.error);
      actions.error(true);
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is an object', () => {
      let expected = clone(AppState.error);
      actions.error({ field: 'value' });
      expect(AppState.error).toEqual(expected);
    })

    test('not change AppState error property if msg is an array', () => {
      let expected = clone(AppState.error);
      actions.error([ 'val1', 'val2' ]);
      expect(AppState.error).toEqual(expected);
    })

    test('change AppState error property to object with message and level field equal to msg agument and \'error\'', () => {
      actions.error('Some error');
      let expected = { message: 'Some error', level: 'error' };
      expect(AppState.error).toEqual(expected);
    })
  })

  describe('warning should', () => {
      test('not change AppState error property if msg is null', () => {
        let expected = clone(AppState.error);
        actions.warning(null);
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is undefined', () => {
        let expected = clone(AppState.error);
        actions.warning(undefined);
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is an empty string', () => {
        let expected = clone(AppState.error);
        actions.warning('');
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is an empty string', () => {
        let expected = clone(AppState.error);
        actions.warning('  ');
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is a number', () => {
        let expected = clone(AppState.error);
        actions.warning(123);
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is a boolean value', () => {
        let expected = clone(AppState.error);
        actions.warning(true);
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is an object', () => {
        let expected = clone(AppState.error);
        actions.warning({ field: 'value' });
        expect(AppState.error).toEqual(expected);
      })

      test('not change AppState error property if msg is an array', () => {
        let expected = clone(AppState.error);
        actions.warning([ 'val1', 'val2' ]);
        expect(AppState.error).toEqual(expected);
      })

      test('change AppState error property to object with message and level field equal to msg agument and \'error\'', () => {
        actions.warning('Some error');
        let expected = { message: 'Some error', level: 'warning' };
        expect(AppState.error).toEqual(expected);
      })
  })

  describe('getSC should ', () => {
    test('always return a method', () => {
      let result = actions.getSC();
      expect(typeof result).toBe('function');
    })

    describe('return a method which', () => {
      test('calls getSC argument method with \'payload\' field value of its argument if \'operationSuccedded\' property of its argument is true', () => {
        const method = jest.fn((payload) => {});
        let expectedArgument = { field: 'value'};
        let result = actions.getSC(method);
        result({ operationSuccedded: true, payload: expectedArgument });
        expect(method).toBeCalledWith(expectedArgument);
      })

      test('does not call getSC argument method if \'operationSuccedded\' property is false', () => {
        const method = jest.fn((payload) => {});
        let result = actions.getSC(method);
        result({ operationSuccedded: false });
        expect(method).not.toBeCalled();
      })

      test('sets AppState.error.message field to \'errorMessage\' field value of its argument and  AppState.error.level to \'error\' if \'operationSuccedded\' property of its argument is false', () => {
        const method = (payload) => {};
        let errorMsg = 'error text';
        let expected = { level: 'error', message: errorMsg };
        let result = actions.getSC(method);
        result({ operationSuccedded: false, errorMessage: errorMsg });
        expect(AppState.error).toEqual(expected);
      })
    })
  })
});

const clone = (objToClone) => {
  return JSON.parse(JSON.stringify(objToClone));
};
