import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(username, password);
      loginAdmin(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-herobg">
      <div className="max-w-sm w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl">
        <h1 className="font-display text-2xl font-semibold text-herotext mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-herotext placeholder-herotext/40 focus:outline-none focus:border-gold transition-colors"
          />
          <input
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-herotext placeholder-herotext/40 focus:outline-none focus:border-gold transition-colors"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gold text-herobg rounded-full font-medium hover:bg-golddeep transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;