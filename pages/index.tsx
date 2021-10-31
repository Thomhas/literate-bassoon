import React, { useState, useRef, useEffect } from "react";

import Output from "../components/OutputHandler/Output";
import Input from "../components/InputHandler/InputHandler";

export default function Home() {
  const [searchWord, setSearchWord] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const isFirstRun = useRef(true);

  const handleSearch = () => {
    fetch("/api/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchWord),
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
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    handleSearch();
  }, [searchWord]);

  const handleSearchInput = (input: string) => {
    setSearchWord(input);
  };

  return (
    <div>
      <Output rate={result} />
      <Input handleSearch={handleSearchInput} />
    </div>
  );
}
