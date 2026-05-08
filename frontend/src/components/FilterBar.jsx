import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { CATEGORIES } from '../services/expenseService';

export default function FilterBar({ onFilter }) {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const apply = () => onFilter({ category: category || undefined, startDate: startDate || undefined, endDate: endDate || undefined });

  const reset = () => {
    setCategory(''); setStartDate(''); setEndDate(''); setSearch('');
    onFilter({});
  };

  const hasFilters = category || startDate || endDate || search;

  return (
    <div className="card mb-6">
      <div className="flex flex-wrap gap-3 items-end">
        {/* Category */}
        <div className="flex-1 min-w-36">
          <label className="label">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="input">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Start date */}
        <div className="flex-1 min-w-36">
          <label className="label">From</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" />
        </div>

        {/* End date */}
        <div className="flex-1 min-w-36">
          <label className="label">To</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input" />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pb-0.5">
          <button onClick={apply} className="btn-primary">
            <Filter size={15} /> Filter
          </button>
          {hasFilters && (
            <button onClick={reset} className="btn-secondary">
              <X size={15} /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
