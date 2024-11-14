import { RxCross1 } from "react-icons/rx";
import "../styles/customModal.css";
import { Children, cloneElement, useState } from "react";

const Modal = ({ show, onHide, customClass, submitBtn, children }) => {
  const [btn, setBtn] = useState(submitBtn);

  // clone childrens and pass function as props
  const childrenWithProps = Children.map(children, (child) => {
    return cloneElement(child, { ...child.props, setBtn });
  });

  return (
    <div
      className={`modal-overlay ${
        show ? "open" : ""
      } flex flex-col px-5 py-3 bg-bgPrimary shadow-lg shadow-[#232328] rounded-xl ${customClass}`}
    >
      <div className="flex flex-row justify-between py-2 mb-4 text-lg">
        <div></div>
        <button
          className="bg-bgSecondary p-2 rounded-full"
          onClick={() => onHide()}
        >
          <RxCross1 />
        </button>
      </div>
      <div className="w-full h-full overflow-y-auto">{childrenWithProps}</div>
      <div className="w-full flex justify-center mt-4">{btn}</div>
    </div>
  );
};

export default Modal;
