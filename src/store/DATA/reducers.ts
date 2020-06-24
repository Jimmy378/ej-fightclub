import { ActionType, getType } from 'typesafe-actions';
import { State, InitialState } from './state';
import * as Actions from './actions';
type Action = ActionType<typeof Actions>;

export const Reducer = (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case getType(Actions.setAuthentication):
      return { ...state, authenticated: action.payload };

    case getType(Actions.setUpdateAvailable):
      return { ...state, authenticated: action.payload };

    default:
      return state;
  }
};
