import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

export const FundIdentificationStep = ({ onComplete }: { onComplete: () => void }) => {
  const { register, setValue, watch } = useFormContext();
  
  // Watch fields for auto-generating fund_id
  const amcName = watch('amc_name');
  const schemeName = watch('scheme_name');
  
  useEffect(() => {
    if (amcName && schemeName) {
      const generateFundId = (amc: string, scheme: string) => {
        const clean = (str: string) => 
          str.toLowerCase()
             .replace(/[^a-z0-9\s]/g, '')
             .replace(/\s+/g, '_')
             .trim();
        return `${clean(amc)}_${clean(scheme)}`;
      };
      const newFundId = generateFundId(amcName, schemeName);
      setValue('fund_id', newFundId, { shouldValidate: true });
    }
  }, [amcName, schemeName, setValue]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 1: Fund Identification</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Fund Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Fund ID (auto-generated)</label>
              <input
                {...register('fund_id')}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2 bg-gray-100"
                readOnly
                placeholder="Will auto-generate from AMC + Fund Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name of Fund *</label>
              <input
                {...register('scheme_name', { required: true })}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Enter full scheme name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Scheme Code *</label>
              <input
                {...register('scheme_code', { required: true })}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Unique scheme code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Product Type *</label>
              <select {...register('product_name', { required: true })} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
                <option value="">Select...</option>
                <option value="PMS">PMS</option>
                <option value="AIF">AIF</option>
                <option value="Mutual Fund">Mutual Fund</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Classification</label>
              <input
                {...register('scheme_classification')}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="e.g., Multi Cap & Flexi CAP"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Asset Class</label>
              <select {...register('scheme_assetclass')} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
                <option value="">Select...</option>
                <option value="Equity">Equity</option>
                <option value="Debt">Debt</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Benchmark Name</label>
              <input
                {...register('scheme_benchmark_name')}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="e.g., NIFTY 500"
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
              <label className="block text-sm font-medium mb-1">Minimum Investment</label>
              <input
                {...register('scheme_min_investment')}
                type="number"
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Amount in INR"
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

            <div>
              <label className="block text-sm font-medium mb-1">Scheme Objective</label>
              <textarea
                {...register('scheme_objective')}
                rows={3}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Brief description of investment objective"
              />
            </div>
          </div>
        </div>

        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">AMC Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">AMC ID</label>
              <input
                {...register('amc_id')}
                type="number"
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">AMC Name *</label>
              <input
                {...register('amc_name', { required: true })}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="e.g., White Oak Capital"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SEBI Registration Number</label>
              <input
                {...register('amc_sebi_no')}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="INP00000XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">AMC Website</label>
              <input
                {...register('amc_website')}
                type="url"
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="https://www.amc.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">AMC Logo URL</label>
              <input
                {...register('amc_logo')}
                type="url"
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Link to logo image"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Next: Upload Time-Series Data
        </button>
      </div>
    </div>
  );
};