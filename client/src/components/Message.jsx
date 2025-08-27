import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const baseClasses = 'p-4 rounded-lg my-4 text-center text-sm font-medium';
  const variantClasses = {
    danger: 'bg-red-100 text-red-800',
    success: 'bg-green-100 text-green-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return <div className={`${baseClasses} ${variantClasses[variant]}`}>{children}</div>;
};

export default Message;