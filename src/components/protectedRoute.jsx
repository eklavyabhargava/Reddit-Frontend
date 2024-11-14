import { useDispatch, useSelector } from "react-redux";
import { toggleLoginModal } from "../shared/actions";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isUserLoggedIn, isLoading } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUserLoggedIn && !isLoading) {
      dispatch(toggleLoginModal());
    }
  }, [isUserLoggedIn, dispatch]);

  if (isUserLoggedIn) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
