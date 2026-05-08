import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ExpenseList from './pages/ExpenseList';
import ExpenseFormPage from './pages/ExpenseFormPage';

export default function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<ExpenseList />} />
              <Route path="/expenses/add" element={<ExpenseFormPage />} />
              <Route path="/expenses/edit/:id" element={<ExpenseFormPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ExpenseProvider>
    </ThemeProvider>
  );
}
