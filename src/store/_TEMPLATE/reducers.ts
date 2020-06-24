import { ActionType, getType } from 'typesafe-actions';
import { State, InitialState } from './state';
import * as Actions from './actions';
type Action = ActionType<typeof Actions>;

export const Reducer = (state: State = InitialState, action: Action): State => {
  switch (action.type) {
    case getType(Actions.testActionOne):
      return { ...state, loading: true };
    case getType(Actions.testActionTwo):
      return { ...state, input: action.payload };

    case getType(Actions.ASYNCACTION.request):
      return { ...state, loading: true };
    case getType(Actions.ASYNCACTION.success):
      return { ...state, input: action.payload };

    default:
      return state;
  }
};
