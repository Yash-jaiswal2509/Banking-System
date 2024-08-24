"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <>
      <CountUp
        end={amount * 85}
        prefix="₹"
        duration={2}
        decimals={2}
      />
    </>
  );
};

export default AnimatedCounter;
