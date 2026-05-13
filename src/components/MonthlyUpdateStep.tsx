import { useFormContext } from 'react-hook-form';
import { FileUpload } from './FileUpload';

interface Props {
  onComplete: () => void;
  onEdit: (step: string) => void;
}

export const MonthlyUpdateStep = ({ onComplete, onEdit }: Props) => {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 5: Monthly Update</h2>
      
      {/* Hidden auto-generated fields */}
      <input type="hidden" {...register('fund_id')} />
      <input type="hidden" {...register('amc_id')} />

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Latest Fund Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              {...register('Performance_Metrics.date', { required: true })}
              type="date"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">NAV *</label>
            <input
              {...register('Performance_Metrics.nav', { required: true })}
              type="number"
              step="0.0001"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="100.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">AUM (₹ Crores) *</label>
            <input
              {...register('Performance_Metrics.aum', { required: true })}
              type="number"
              step="0.01"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="125.50"
            />
          </div>
        </div>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Any Other Updates?</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Updates to Fund or Manager</label>
            <textarea
              {...register('fund_updates')}
              rows={4}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="Any changes to fund strategy, management, operations, etc."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Supporting Documents (Optional)</label>
            <FileUpload
              name="update_documents"
              accept=".pdf,.doc,.docx,.xlsx,.csv"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => onEdit('upload-data')}
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
    </div>
  );
};