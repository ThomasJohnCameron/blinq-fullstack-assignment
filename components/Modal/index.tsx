/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClose();
  };

  const backdropStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  `;

  const contentStyle = css`
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    width: 500px;
    max-width: 100%;
    position: relative;
    z-index: 1000;
  `;

  return (
    <div css={backdropStyle} onClick={handleClick}>
      <div css={contentStyle} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
