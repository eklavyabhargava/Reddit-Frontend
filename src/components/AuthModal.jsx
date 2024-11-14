import Login from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Modal from "./Modal";

const AuthModal = ({ show, onHide, customClass }) => {
  const [showSignup, setSignup] = useState(false);

  return (
    <Modal show={show} onHide={onHide} customClass={customClass}>
      {showSignup ? (
        <Signup showLoginForm={() => setSignup(false)} onHide={onHide} />
      ) : (
        <Login showSignup={() => setSignup(true)} onHide={onHide} />
      )}
    </Modal>
  );
};

export default AuthModal;
