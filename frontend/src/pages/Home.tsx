import { Logo } from "../Icons/logo";
import { Link } from "react-router-dom";
import { Button } from "../components/genericButton";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="w-full p-4 px-8 flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <Logo />
          <div className="font-bold text-2xl text-blue-800">Brainly</div>
        </div>
        <div className="space-x-4">
          <Link to="/signin">
            <Button variant="secondary" size="md" text="Sign In" />
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="md" text="Sign Up" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Build your Second Brain.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
          Organize your thoughts, store your ideas, and share your knowledge seamlessly.
        </p>
        <Link to="/signup">
          <Button variant="primary" size="md" text="Get Started" />
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Brainly. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
