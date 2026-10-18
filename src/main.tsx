import { createRoot } from 'react-dom/client';
import App from './App';
import AdminPanel from './components/AdminPanel';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(window.location.pathname.replace(/\/$/, '') === '/admin' ? <AdminPanel /> : <App />);
