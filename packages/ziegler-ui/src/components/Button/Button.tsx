import React from "react";

export type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const Button = ({ onClick, label }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
