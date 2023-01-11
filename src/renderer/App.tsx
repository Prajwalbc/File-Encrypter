import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DropPage from './pages/dropPage';
import EditPage from './pages/editPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  return (
    <div>
      <ToastContainer autoClose={1500} theme="colored" position="bottom-left" />
      <Router>
        <Routes>
          <Route path="/" element={<DropPage />} />
          <Route path="/edit" element={<EditPage />} />
        </Routes>
      </Router>
    </div>
  );
}
