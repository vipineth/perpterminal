import { useRouter } from "next/router";
import Header from "../../components/Header";
import Account from "../../components/Account";

export default function Address() {
  let router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Account" isSmall />
      <Account address={router?.query.address} />
    </div>
  );
}
