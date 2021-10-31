import React, { FC, useState } from "react";
import styles from "./ImputHandler.module.css";

interface IInput {
  handleSearch: (input: string) => void;
}

const Input: FC<IInput> = ({ handleSearch }) => {
  const [input, setInput] = useState("");

  const handleInput = (input: string) => {
      try{
        validateSearch(input);
        handleSearch(input); 
      }catch((err) => {throw new Error(err)} 
  };

  const validateSearch = (input: string) => {
    if (input === "") throw new Error("Search field cannot be empty!");
  };

  return (
    <div id="wrapper">
      <input type="text" onChange={(e) => setInput(e.target.value)}></input>
      <button onClick={() => handleInput(input)}>Search & Count</button>
    </div>
  );
};

export default Input;
