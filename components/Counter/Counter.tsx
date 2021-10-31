import React, { FC, useState } from "react";
import CountUp from "react-countup";
interface IOutput {
  rate: number;
}

const Counter: FC<IOutput> = ({ rate }) => {
  return (
    <div>
      <h2>
        <CountUp end={rate} duration={1} />
      </h2>
    </div>
  );
};

export default Counter;
