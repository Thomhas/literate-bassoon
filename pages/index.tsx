import React, { useState, useEffect } from "react";

import Counter from "../components/Counter/Counter";
import SearchBox from "../components/SearchBox/SearchBox";

import styles from "./index.module.css";

const Home = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<number>(0);

  const handleSearch = () => {
    fetch("/api/findTopic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        validateData(data);
        setResult(data);
      })
      .catch((e) => {
        setResult(0);
      });
  };

  const validateData = (data: number | string) => {
    if (typeof data === "string") throw new Error(data);
  };
  useEffect(() => {
    handleSearch();
  }, [input]);

  const handleSearchInput = (input: string) => {
    setInput(input);
  };

  return (
    <div className={styles.container}>
      <Counter rate={result} />
      <SearchBox handleSearch={handleSearchInput} />
    </div>
  );
};

export default Home;
