import { MdPhoneAndroid } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useEffect, useState } from "react";
import { loginUser } from "../api/userService";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../shared/actions";

const Login = ({ showSignup, setBtn, onHide }) => {
  const [formData, setFormData] = useState({
    usernameOrEmailId: "",
    password: "",
  });
  const btnText = "Log In";
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // validate form data
  const validateFormData = () => {
    let isValid = true;

    if (!formData.usernameOrEmailId.trim()) {
      isValid = false;
    }
    if (!formData.password.trim()) {
      isValid = false;
    }

    return isValid;
  };

  const state = useSelector((state) => state);

  // handle input changes
  const handleOnChange = ({ name, value }) => {
    setFormData((currData) => {
      return { ...currData, [name]: value };
    });
  };

  // handle user login
  const handleUserLogin = async () => {
    const isValidForm = validateFormData();
    if (!isValidForm) return;

    setLoading(true);
    const response = await loginUser(formData);
    if (response.isSuccess) {
      dispatch(updateUserDetails(response.user, true));
      onHide();
    }
    setLoading(false);
  };

  useEffect(() => {
    const isValidForm = validateFormData();

    if (!isValidForm) {
      setBtn(
        <button
          disabled={true}
          className="disabled:bg-bgSecondary text-gray-500 desktop:w-[70%] w-full text-center py-3 rounded-full"
        >
          {btnText}
        </button>
      );
    } else {
      setBtn(
        <button
          disabled={loading ? true : false}
          className="bg-btnPrimary hover:bg-btnSecondary disabled:bg-bgSecondary desktop:w-[70%] w-full text-center py-3 rounded-full"
          onClick={() => handleUserLogin()}
        >
          {btnText}
        </button>
      );
    }
  }, [formData, loading]);

  return (
    <div className="desktop:w-[70%] w-full mx-auto flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <p className="text-2xl font-semibold">Log In</p>
        <p className="text-sm">
          By continuing, you agree to our{" "}
          <Link to="" style={{ color: "skyblue" }}>
            User Agreement
          </Link>{" "}
          and acknowledge that you understand the{" "}
          <Link to="" style={{ color: "skyblue" }}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-col gap-y-2">
        <button className="flex flex-row justify-between items-center rounded-full w-full bg-white text-black p-2">
          <div className="text-2xl">
            <MdPhoneAndroid />
          </div>
          <p className="text-sm">Continue With Phone Number</p>
          <p></p>
        </button>
        <button className="flex flex-row justify-between items-center rounded-full w-full bg-white text-black p-2">
          <div className="text-2xl">
            <FcGoogle />
          </div>
          <p className="text-sm">Continue With Google</p>
          <p></p>
        </button>
        <button className="flex flex-row justify-between items-center rounded-full w-full bg-white text-black p-2">
          <div className="text-2xl">
            <FaApple />
          </div>
          <p className="text-sm">Continue With Apple</p>
          <p></p>
        </button>
      </div>
      <div className="flex items-center my-2">
        <hr className="h-px bg-gray-500 grow border-none m-0" />
        <span className="px-2 text-gray-500 text-sm">OR</span>
        <hr className="h-px grow bg-gray-500 border-none m-0" />
      </div>
      <div className="flex flex-col gap-y-3">
        <input
          type="text"
          name="usernameOrEmailId"
          placeholder="Email or username"
          className="bg-gray-700 p-4 rounded-2xl"
          value={formData.usernameOrEmailId}
          onChange={(e) => handleOnChange(e.target)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="bg-gray-700 p-4 rounded-2xl"
          value={formData.password}
          onChange={(e) => handleOnChange(e.target)}
        />
      </div>
      <div className="flex flex-col gap-y-2 text-sm">
        <button className="self-start" style={{ color: "skyblue" }}>
          Forgot Password?
        </button>
        <p>
          New to Reddit?{" "}
          <button onClick={() => showSignup()} style={{ color: "skyblue" }}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
