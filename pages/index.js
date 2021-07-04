import Main from "../components/Main";
import Header from "../components/Header";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Dashboard" />
      <Main />
    </div>
  );
}
