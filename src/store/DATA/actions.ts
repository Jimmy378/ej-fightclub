import { createAction } from 'typesafe-actions';

export const setAuthentication = createAction('@auth/SET', (auth: boolean) => auth)<boolean>();
export const setUpdateAvailable = createAction('@update/SET', (auth: boolean) => auth)<boolean>();
