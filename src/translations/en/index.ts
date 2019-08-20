import flatten from 'flat';

const messages = {
  foo: {
    bar: 'English',
  },
};

export default flatten(messages);
