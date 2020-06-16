import get from 'lodash/get'

/**
 * Creates a sequential request where every other request depends on
 * the result of the previous request
 * @param {*} requests 
 */
export function parallelRequest(requests = []) {
  return async (props) => {
    const response = await Promise.all(request.map(action => action(props)));

    return response.map(item => get(item, 'data'));
  }
}