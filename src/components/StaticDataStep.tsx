import { useFormContext } from 'react-hook-form';

export const StaticDataStep = ({ onComplete }: { onComplete: () => void }) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 3: Static Data & Manager Info</h2>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Latest Performance Metrics (Performance_Metrics)</h3>
        <p className="text-sm text-gray-600 mb-4">Enter the most recent performance data as of a specific date.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">date</label>
            <input {...register('Performance_Metrics.date')} type="date" className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">nav</label>
            <input {...register('Performance_Metrics.nav')} type="number" step="0.0001" className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">aum</label>
            <input {...register('Performance_Metrics.aum')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium mb-1">scheme_ret_1m</label><input {...register('Performance_Metrics.scheme_ret_1m')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">scheme_ret_3m</label><input {...register('Performance_Metrics.scheme_ret_3m')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">scheme_ret_6m</label><input {...register('Performance_Metrics.scheme_ret_6m')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">scheme_ret_1y</label><input {...register('Performance_Metrics.scheme_ret_1y')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">scheme_ret_3y</label><input {...register('Performance_Metrics.scheme_ret_3y')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          <div><label className="block text-sm font-medium mb-1">scheme_ret_5y</label><input {...register('Performance_Metrics.scheme_ret_5y')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
        </div>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Risk Ratios (Fund_Risk_Ratios)</h3>
        <p className="text-sm text-gray-600 mb-4">Enter for 1Yr and 3Yr periods (period_in_yrs = 1 or 3)</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">1 Year</h4>
            <input type="hidden" {...register('Fund_Risk_Ratios.0.period_in_yrs')} value="1" />
            <div><label className="block text-sm font-medium mb-1">alpha</label><input {...register('Fund_Risk_Ratios.0.alpha')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">beta</label><input {...register('Fund_Risk_Ratios.0.beta')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">sharperatio</label><input {...register('Fund_Risk_Ratios.0.sharperatio')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">standarddeviation</label><input {...register('Fund_Risk_Ratios.0.standarddeviation')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">total_stocks</label><input {...register('Fund_Risk_Ratios.0.total_stocks')} type="number" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">3 Years</h4>
            <input type="hidden" {...register('Fund_Risk_Ratios.1.period_in_yrs')} value="3" />
            <div><label className="block text-sm font-medium mb-1">alpha</label><input {...register('Fund_Risk_Ratios.1.alpha')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">beta</label><input {...register('Fund_Risk_Ratios.1.beta')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">sharperatio</label><input {...register('Fund_Risk_Ratios.1.sharperatio')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">standarddeviation</label><input {...register('Fund_Risk_Ratios.1.standarddeviation')} type="number" step="0.01" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
            <div><label className="block text-sm font-medium mb-1">total_stocks</label><input {...register('Fund_Risk_Ratios.1.total_stocks')} type="number" className="w-full border border-[#e5e7eb] rounded px-3 py-2" /></div>
          </div>
        </div>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Fund Manager (Fund_Manager_Details)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">fund_manager_name *</label>
            <input {...register('fund_manager_name', { required: true })} className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">fund_manager_designation</label>
            <input {...register('fund_manager_designation')} className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">fund_manager_from</label>
            <input {...register('fund_manager_from')} type="date" className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">fund_manager_image (URL)</label>
            <input {...register('fund_manager_image')} type="url" className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">educational_background</label>
          <textarea {...register('educational_background')} rows={3} className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">previous_experience</label>
          <textarea {...register('previous_experience')} rows={3} className="w-full border border-[#e5e7eb] rounded px-3 py-2" />
        </div>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Fee Structure (Fund_Fees)</h3>
        <p className="text-sm text-gray-600 mb-4">Add multiple fee types if applicable</p>
        
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            <input {...register('Fund_Fees.0.fee_type')} placeholder="e.g., Fixed Management Fee" className="border border-[#e5e7eb] rounded px-3 py-2" />
            <input {...register('Fund_Fees.0.fee_category')} placeholder="Category (optional)" className="border border-[#e5e7eb] rounded px-3 py-2" />
            <input {...register('Fund_Fees.0.fee_value')} type="number" step="0.01" placeholder="Value %" className="border border-[#e5e7eb] rounded px-3 py-2" />
            <input {...register('Fund_Fees.0.hurdle_details')} placeholder="Hurdle details" className="border border-[#e5e7eb] rounded px-3 py-2" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => window.history.back()}
          className="text-gray-600 px-6 py-2 rounded"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Review & Submit
        </button>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Risk-Free Rate Data</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">10-Year G-Sec Date</label>
            <input {...register('Risk_Free_Rate_10Y_Date')} type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">10-Year G-Sec Rate (%)</label>
            <input {...register('Risk_Free_Rate_10Y_Value')} type="number" step="0.01" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Core CPI Date</label>
            <input {...register('Risk_Free_Rate_CPI_Date')} type="date" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Core CPI Rate (%)</label>
            <input {...register('Risk_Free_Rate_CPI_Value')} type="number" step="0.01" />
          </div>
        </div>
      </div>

    </div>
  );
};