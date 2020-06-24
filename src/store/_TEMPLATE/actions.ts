import { createAction, createAsyncAction } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { AppState } from '../state';

export const testActionOne = createAction('@test/ACTION_ONE')<string>();
// () => { type: 'test/ACTION_ONE'; payload: null }

export const testActionTwo = createAction('@test/ACTION_TWO', (id: string) => id)<string>();

export const ASYNCACTION = createAsyncAction(
  ['@test/ASYNC_REQUEST', () => { }],
  ['@test/ASYNC_SUCCESS', (res: string) => res],
  [
    '@test/ASYNC_FAILED',
    (err: Error) => {
      console.log(err);
    },
  ],
)();

export const action = (input: string) => {
  return async (dispatch: Dispatch, getState: () => AppState) => {
    try {
      dispatch(ASYNCACTION.request());
      dispatch(ASYNCACTION.success(input));
    } catch (error) {
      dispatch(ASYNCACTION.failure(error));
    }
  };
};
