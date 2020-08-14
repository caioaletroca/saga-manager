/**
 * Check for duplicated entries on the saga register
 * Duplication leads to sagas runs multiple times with a single action
 * This is a issue hard to detect
 * @param {*} sagas 
 */
export function registerSagas (sagas) {
  // Check for duplicated
  const duplicated = sagas.filter((item, index) => sagas.indexOf(item) != index);
  if(duplicated.length > 0)
    throw Error('There is duplicated sagas registered in redux-saga. Please, remove the duplicated entries.');

  // Build the sagas
  return sagas.map(i => i());
}