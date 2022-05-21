import React from "react";
import { ToastContainer } from "react-toastify"; //dependency used for modified alert messages

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Toast;
