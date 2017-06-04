import Cloner from '../../Utils/Cloner';

describe('Cloner', () => {
  test('clone should return undefined if it gets undefined', () => {
    expect(Cloner.clone(undefined)).toBeUndefined();
  })

  test('clone should return undefined if it gets null', () => {
    expect(Cloner.clone(null)).toBeUndefined();
  })

  test('clone should return undefined if it gets an empty string', () => {
    expect(Cloner.clone('')).toBeUndefined();
  })

  test('clone should return deep copy of the given object', () => {
    let objToClone = {f1: 'v1', f2: 2, obj: { objF1: 'vobjF1'}};
    expect(Cloner.clone(objToClone)).toEqual(objToClone);
  })
})
