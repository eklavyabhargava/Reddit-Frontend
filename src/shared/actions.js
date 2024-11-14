import axiosInstance from "../api/axiosInstance";

export const toggleLoginModal = () => ({
  type: "TOGGLE_lOGIN_MODAL",
});

export const updateUserDetails = (user, isUserLoggedIn) => ({
  type: "SET_USER",
  payload: { user, isUserLoggedIn },
});

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/check-auth");
    if (response.data.isAuthenticated) {
      dispatch({
        type: "SET_USER",
        payload: {
          user: response.data.user,
          isUserLoggedIn: true,
          isLoading: false,
        },
      });
    }
  } catch (error) {}
};

export const changeLoadingState = (isLoading) => ({
  type: "SET_LOADING",
  payload: isLoading,
});

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (response.data.isSuccess) {
      dispatch({
        type: "SET_USER",
        payload: { user: {}, isUserLoggedIn: false },
      });
    }
  } catch (error) {}
};
