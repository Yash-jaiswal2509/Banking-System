"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
      <CountUp
        end={amount}
        prefix="₹"
        duration={2}
        decimals={2}
      />
    </>
  );
};

export default AnimatedCounter;
