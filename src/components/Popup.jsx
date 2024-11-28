import "../css/popup.css";
import "../App.css";
import React from "react";

const Popup = ({ isOpen, onClose, children }) => {
  // if popup closed, return null
  if (!isOpen) return null;

  // Clone children and pass extra props
  const childrenWithOnClose = React.Children.map(children, (child) =>
    React.cloneElement(child, { onClose: onClose })
  );

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close-btn" onClick={onClose}>
          Close
        </button>
        {childrenWithOnClose}
      </div>
    </div>
  );
};

export default Popup;
