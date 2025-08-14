import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import './my-card/my-card';
import './styles.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error("Не найден элемент с id 'root'");
}

const root = createRoot(container);
root.render(<App />);
