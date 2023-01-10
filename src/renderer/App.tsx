import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import DropPage from './pages/dropPage';
import EditPage from './pages/editPage';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DropPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </Router>
  );
}
