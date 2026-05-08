import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '../context/ExpenseContext';
import { CATEGORIES } from '../services/expenseService';
import { Save, X, Loader2 } from 'lucide-react';

const defaultForm = { title: '', amount: '', category: '', date: '', description: '' };

export default function ExpenseForm({ expenseId }) {
  const { createExpense, updateExpense, expenses } = useExpenses();
  const navigate = useNavigate();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEdit = Boolean(expenseId);

  useEffect(() => {
    if (isEdit) {
      const exp = expenses.find(e => e.id === Number(expenseId));
      if (exp) setForm({ title: exp.title, amount: String(exp.amount), category: exp.category, date: exp.date, description: exp.description || '' });
    }
  }, [expenseId, expenses]);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) errs.amount = 'Enter a valid positive amount';
    if (!form.category) errs.category = 'Select a category';
    if (!form.date) errs.date = 'Date is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      const payload = { ...form, amount: Number(form.amount) };
      if (isEdit) await updateExpense(Number(expenseId), payload);
      else await createExpense(payload);
      navigate('/expenses');
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  const Field = ({ name, label, type = 'text', children, placeholder }) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      {children || (
        <input id={name} name={name} type={type} value={form[name]} onChange={handleChange}
          placeholder={placeholder}
          className={`input ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`} />
      )}
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card max-w-xl mx-auto animate-slide-up">
      <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
        {isEdit ? '✏️ Edit Expense' : '➕ Add New Expense'}
      </h2>

      <div className="space-y-4">
        <Field name="title" label="Title" placeholder="e.g. Lunch at café" />

        <div className="grid grid-cols-2 gap-4">
          <Field name="amount" label="Amount (₹)" type="number" placeholder="0.00" />
          <Field name="date" label="Date" type="date" />
        </div>

        <Field name="category" label="Category">
          <select id="category" name="category" value={form.category} onChange={handleChange}
            className={`input ${errors.category ? 'border-red-400 focus:ring-red-400' : ''}`}>
            <option value="">Select a category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field name="description" label="Description (optional)">
          <textarea id="description" name="description" value={form.description} onChange={handleChange}
            rows={3} placeholder="Any additional notes..." className="input resize-none" />
        </Field>

        {errors.submit && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl px-4 py-3 text-sm">
            {errors.submit}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1 justify-center">
            <X size={16} /> Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary flex-1 justify-center">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {isEdit ? 'Update' : 'Add Expense'}
          </button>
        </div>
      </div>
    </form>
  );
}
