import { createReducer } from "@reduxjs/toolkit";

/**
 * Generates the State Reducer for standard sagas
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
export function createStateReducer(
  actions,
  extendReducers,
  extendInitialState
) {
  const initialState = {
    loading: false,
    failed: false,
    success: false,
    ...extendInitialState,
  };

  let reducers = {};
  if (Array.isArray(actions)) {
    for (let i in actions) {
      reducers = {
        ...reducers,
        [actions[i].loading]: (state, action) => {
          state.loading = action.payload;
        },
        [actions[i].failed]: (state, action) => {
          state.failed = action.payload.failed;
        },
        [actions[i].success]: (state, action) => {
          state.success = action.payload;
        },
      };
    }
  } else {
    reducers = {
      [actions.loading]: (state, action) => {
        state.loading = action.payload;
      },
      [actions.failed]: (state, action) => {
        state.failed = action.payload.failed;
      },
      [actions.success]: (state, action) => {
        state.success = action.payload;
      },
    };
  }

  return createReducer(initialState, {
    ...reducers,
    ...extendReducers,
  });
}