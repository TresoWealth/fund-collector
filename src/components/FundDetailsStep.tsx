import { useFormContext } from 'react-hook-form';

interface Props {
  onComplete: () => void;
  onEdit: (step: string) => void;
}

export const FundDetailsStep = ({ onComplete, onEdit }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 2: Fund Details</h2>
      
      {/* Hidden auto-generated fields */}
      <input type="hidden" {...register('fund_id')} />
      <input type="hidden" {...register('amc_id')} />
      
      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Fund Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Fund Name *</label>
            <input
              {...register('scheme_name', { required: true })}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="e.g., Long Term Value Fund"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fund Type *</label>
            <select {...register('product_name', { required: true })} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
              <option value="">Select...</option>
              <option value="PMS">PMS</option>
              <option value="AIF Cat 1">AIF Cat 1</option>
              <option value="AIF Cat 2">AIF Cat 2</option>
              <option value="AIF Cat 3">AIF Cat 3</option>
              <option value="SIF">SIF</option>
              <option value="Mutual Fund">Mutual Fund</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fund Classification</label>
            <input
              {...register('scheme_classification')}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="e.g., Equity: Multi Cap"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fund's Primary Asset Class</label>
            <select {...register('scheme_assetclass')} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
              <option value="">Select...</option>
              <option value="Listed Equity">Listed Equity</option>
              <option value="Unlisted Equity">Unlisted Equity</option>
              <option value="Debt">Debt</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Benchmark Name</label>
            <input
              {...register('scheme_benchmark_name')}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="e.g., NIFTY 500 TRI"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Inception Date</label>
            <input
              {...register('scheme_inception_date')}
              type="date"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Minimum Investment (₹)</label>
            <input
              {...register('scheme_min_investment')}
              type="number"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="50000000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select {...register('scheme_currency')} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">Fund Objective</label>
          <textarea
            {...register('scheme_objective')}
            rows={3}
            className="w-full border border-[#e5e7eb] rounded px-3 py-2"
            placeholder="Brief description of fund strategy and objectives"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => onEdit('amc-details')}
          className="text-gray-600 px-6 py-2 rounded"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Next: Fee Structure
        </button>
      </div>
    </div>
  );
};