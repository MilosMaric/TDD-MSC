export default {
  clone: (objToClone) => {
    return objToClone ? JSON.parse(JSON.stringify(objToClone)) : undefined;
  }
}
