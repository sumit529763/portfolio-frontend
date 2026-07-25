import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import AdminLogin from './admin/AdminLogin';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;