export interface ReduxAction {
  readonly type?: string;
}

export interface InitialState {
  readonly user?: any;
  readonly token?: string;
}

const initialState = {
  token: null,
  user: null,
};

const authReducer = (state = initialState, action: ReduxAction = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
