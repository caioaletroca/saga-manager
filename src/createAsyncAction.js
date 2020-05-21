import { createAction } from "@reduxjs/toolkit";

/**
 * Creates a object containing lifecycle request for async operations
 * @param {*} base 
 */
export function createAsyncAction(base) {
  return {
    fetch: createAction(`${base}_FETCH`, (data, meta) => ({
      payload: data,
      meta,
    })),
    data: createAction(`${base}_DATA`, (data, meta) => ({
      payload: data,
      meta,
    })),
    loading: createAction(`${base}_LOADING`),
    failed: createAction(`${base}_FAILED`),
    success: createAction(`${base}_SUCCESS`),
    clear: createAction(`${base}_CLEAR`),
  };
}