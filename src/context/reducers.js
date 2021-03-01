const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        user: action.payload,
        isLogged: true,
      };
    }
    case "USER_LOGOUT": {
      return {
        user: {},
        isLogged: false,
      };
    }
    case "JOIN_CHAT": {
      return {
        ...state,
        currentChat: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
