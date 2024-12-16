import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Category from "./components/Category";
import Metal from "./components/Metal";
import MaterialForm from "./components/MaterialForm";
import MaterialDetails from "./components/MaterialDetails";
import ProductsTable from "./components/ProductsTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/metal" element={<Metal />} />
        <Route path="/material-form" element={<MaterialForm />} />
        <Route path="/materials/details/:id" element={<MaterialDetails />} />
        <Route path="/products-table" element={<ProductsTable />} />
      </Routes>
    </Router>
  );
}

export default App;
