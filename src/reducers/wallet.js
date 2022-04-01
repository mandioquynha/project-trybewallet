const INITIAL_STATE = {
  email: '',
};
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state,
      email: action.state };
  default:
    return state;
  }
};

export default user;
