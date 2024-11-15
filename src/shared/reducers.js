const initialState = {
  user: {
    username: "",
    emailId: "",
  },
  isUserLoggedIn: true,
  showLoginModal: false,
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_lOGIN_MODAL":
      // Toggle the login modal state
      return {
        ...state,
        showLoginModal: !state.showLoginModal,
      };

    case "SET_USER":
      // Save user data
      return {
        ...state,
        user: action.payload.user,
        isUserLoggedIn: action.payload.isUserLoggedIn,
        isLoading: action.payload.isLoading || !state.isLoading,
      };

    case "SET_LOADING":
      // Change loading state
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    default:
      return state;
  }
};

export default rootReducer;
