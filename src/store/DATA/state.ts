export interface State {
  readonly authenticated: boolean;
  readonly updateAvailable: boolean;
}

export const InitialState: State = {
  authenticated: false,
  updateAvailable: false,
};
