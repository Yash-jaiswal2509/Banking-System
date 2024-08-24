import HeaderBox from "@/components/HeaderBox"
import PaymentTransferForm from "@/components/PaymentTransferForm"
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn?.$id
  });

  const accountsData = accounts?.data;

  return (
    <section className="payment-transfer">
      <HeaderBox title="Payment Transfer" subtext="Please provide any specific details or notes related to payment transfer" />
      <section className="size-full pt-5">
        {/* Cannnot directly create form as then this page will not be server side, as form will rrequire interactivity, it will be client side */}

        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}

export default Transfer