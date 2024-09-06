"use client";
import React from "react";

const Button = () => {
  return (
    <button
      className="btn btn-outline w-full"
      onClick={() => {
        const modal = document.getElementById(
          "my_modal_1"
        ) as HTMLDialogElement;
        modal?.showModal();
      }}
    >
      +
    </button>
  );
};

export default Button;
