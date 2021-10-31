import React, { FC, useState } from "react";
import styles from "./SearchBox.module.css";

interface IInput {
  handleSearch: (input: string) => void;
}

const SearchBox: FC<IInput> = ({ handleSearch }) => {
  const [input, setInput] = useState("");

  const handleInput = (input: string) => {
    validateSearch(input);
    handleSearch(input);
  };
  const validateSearch = (input: string) => {
    if (input === "") throw new Error("Search field cannot be empty!");
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.countSearch}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button className={styles.countBtn} onClick={() => handleInput(input)}>
        Count
      </button>
    </div>
  );
};

export default SearchBox;
