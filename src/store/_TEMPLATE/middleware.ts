import { MiddlewareAPI, Dispatch, Middleware } from 'redux';
import * as Actions from './actions';
import { ActionType, getType } from 'typesafe-actions';
import { AppState } from '../state';
type Action = ActionType<typeof Actions>;

const AuthMiddleware: Middleware<Dispatch> = ({ dispatch, getState }: MiddlewareAPI) => (next: Dispatch) => (
  action: Action,
) => {
  let state: AppState = getState();
  switch (action.type) {
    case getType(Actions.testActionOne):
      break;
    default:
      return next(action);
  }
};

export default AuthMiddleware;
