import flatten from 'flat';

const messages = {
  foo: {
    bar: 'Polish',
  },
};

export default flatten(messages);
