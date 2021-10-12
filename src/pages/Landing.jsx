import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <header className="max-w-5xl m-auto mt-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold">
        Code With Me, the right place for real time coding
      </h1>
      <p className="my-8 text-xl opacity-80">
        By joining us,<br/> you will be able to have an amazing experience in real time coding with friends
      </p>
      <Link className="p-3 rounded shadow bg-gray-900 hover:opacity-70" to="/profile">Get started for free</Link>
    </header>
  );
};

export default Landing;
