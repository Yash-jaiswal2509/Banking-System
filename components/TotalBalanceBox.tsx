import { formatAmount } from "@/lib/utils";
import CountUp from "react-countup";
import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./DoughnutChart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance-chart">
        <DoughnutChart accounts={accounts} />
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <div className="total-balance-amount flex-center gap-2">
            {/* // used react-countup to animate the totalCurrentBalance but as it uses use-ref inside. So, either i have to change the whole component to render it on client side or use it like a hook */}
            <AnimatedCounter amount={totalCurrentBalance} />
            {/* {formatAmount(totalCurrentBalance)} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
