import React from "react";
const style = require("./Message.module.css");

const Message = ({ success, msg }) => {
  return (
    <>
      {success ? (
        <div className={style.success}>{msg}</div>
      ) : (
        <div className={style.error}>{msg}</div>
      )}
    </>
  );
};

export default Message;
