export interface State {
  readonly input: string;
  readonly loading: boolean;
}

export const InitialState: State = {
  input: '',
  loading: false,
};
