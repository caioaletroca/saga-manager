import get from 'lodash/get'

/**
 * Creates a sequential request where every other request depends on
 * the result of the previous request
 * @param {*} requests 
 */
export function sequentialRequest(requests = []) {
  return async (props) => {
    let data = [];
    for(const action of requests) {
      const response = await action(props, data);
      data.push(get(response, 'data'));
    }
    return { data };
  }
}