import React from "react";
import "../style.css";

const Policy = () => {
  const handleClose = () => {
    window.close();
  };
  return (
    <>
      <div className="login-area" style={{ marginTop: "20%" }}>
        <h1 align="center" className="title">
          Welcome to Policy
        </h1>
        <div className="form-area">
          <form>
            <div style={{ display: "flex" }}>
              <button
                type="submit"
                onClick={handleClose}
                align="center"
                className="btn submit-btn"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Policy;
