import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CategoriasPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import Layout from './components/Layout';
import './index.css'


function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/categorias" replace />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/productos" element={<ProductsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
