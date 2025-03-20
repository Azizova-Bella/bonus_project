import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import Categories from './pages/categories/categories';
import CategoryById from './pages/categories/category-by-id/category-by-id';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="categories" replace />} />
        <Route path="categories" element={<Categories />} />
        <Route path="category/:id" element={<CategoryById />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
