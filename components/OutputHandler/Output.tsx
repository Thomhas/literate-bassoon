import React, { FC, useState } from "react";
import CountUp from "react-countup";

interface IOutput {
  rate: number;
}

const Output: FC<IOutput> = ({ rate }) => {
  return (
    <div>
      <h2>
        <CountUp end={rate} duration={1.5} />
      </h2>
    </div>
  );
};

export default Output;
