import authReducer from './index';

describe('@authReducer', () => {
  it('returns intiial state', () => {
    const result = authReducer();

    expect(result).toEqual({
      token: null,
      user: null,
    });
  });
});
