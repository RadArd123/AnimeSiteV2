import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/Input.jsx';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore.js';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
    toast.success("Logged in successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-500 to-[#657be8] 
        text-transparent bg-clip-text">Welcome back</h2>
        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-[#657be8] hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-[#657be8] text-white font-bold rounded-lg shadow-lg hover:from-[#657be8] hover:to-[#6c81e8] focus:outline-none focus:ring-2 focus:ring-[#657be8] focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center mx-auto w-6 h-6" size={20} />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#657be8] hover:underline">Sign Up</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
