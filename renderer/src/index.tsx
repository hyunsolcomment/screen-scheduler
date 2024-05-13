import ReactDOM from 'react-dom/client';
import './pretendard/pretendard.css';
import './index.css';
import Notification from './pages/Notification';
import { HashRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <HashRouter>
        <Routes>
            <Route element={<Notification />} path="/noti" />
        </Routes>
    </HashRouter>
);
