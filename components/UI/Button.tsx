import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon, className, title }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      title={title} // Tooltip on hover
    >
      {icon && <span className="button-icon">{icon}</span>}
      {label && <span className="button-label">{label}</span>}
    </button>
  );
};

export default Button;
