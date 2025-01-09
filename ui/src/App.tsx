// import {useState} from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ClientsPage from "./pages/ClientPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AccountsPage from "./pages/AccountsPage.tsx";
import AccountDetails from "./pages/AccountDetails.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import ClientDetails from "./pages/ClientDetails.tsx";
import PurchasePage from "./pages/PurchasePage.tsx";
import PurchaseDetails from "./pages/PurchaseDetails.tsx";
import SalesPage from "./pages/SalesPage.tsx";
import SalesDetailsPage from "./pages/SalesDetails.tsx";
import UserPage from "./pages/UserPage.tsx";
import UserDetailsPage from "./pages/UserDetails.tsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/accounts/:id" element={<AccountDetails />} />
          <Route path="/purchases" element={<PurchasePage />} />
          <Route path="/purchases/:id" element={<PurchaseDetails />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/:id" element={<SalesDetailsPage />} />

          <Route path="/users" element={<UserPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          {/*<Route path="/form" element={<Form />} />*/}
        </Routes>
      </Router>
    </>
  );
}

export default App;
