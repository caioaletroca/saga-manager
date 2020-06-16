import get from 'lodash/get'

/**
 * Creates a sequential request where every other request depends on
 * the result of the previous request
 * @param {*} requests 
 */
export function sequentialRequest(requests = [], errorHandling = true) {
  return async (props) => {
    let data = [];
    try {
      for(const action of requests) {
        const response = await action(props, data);
        data.push(get(response, 'data'));
      }
    }
    catch (e) {
      if(errorHandling)
        throw e;
    }
    return { data };
  }
}