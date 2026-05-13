import { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

interface Props {
  onComplete: () => void;
  onEdit: (step: string) => void;
}

export const FeeStructureStep = ({ onComplete, onEdit }: Props) => {
  const { control, register } = useFormContext();
  
  // Use 'as any' to bypass TypeScript's strict typing for this complex case
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Fund_Fees' as any
  });

  // Add first share class by default if none exist
  useEffect(() => {
    if (fields.length === 0) {
      append({
        share_class: 'Class A',
        fixed_management_fee: '',
        performance_fee: '',
        performance_fee_frequency: 'Quarterly',
        hurdle: '',
        high_watermark: 'No',
        catch_up_clause: 'No',
        catch_up_clause_mechanics: ''
      } as any);
    }
  }, [fields.length, append]);

  const addShareClass = () => {
    append({
      share_class: `Class ${String.fromCharCode(65 + fields.length)}`,
      fixed_management_fee: '',
      performance_fee: '',
      performance_fee_frequency: 'Quarterly',
      hurdle: '',
      high_watermark: 'No',
      catch_up_clause: 'No',
      catch_up_clause_mechanics: ''
    } as any);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 3: Fee Structure</h2>
      
      <div className="space-y-4">
        {fields.map((field: any, index: number) => (
          <div key={field.id} className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share Class {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Share Class Name</label>
                <input
                  {...register(`Fund_Fees.${index}.share_class`)}
                  defaultValue={field.share_class}
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Fixed Management Fee (%)</label>
                <input
                  {...register(`Fund_Fees.${index}.fixed_management_fee`)}
                  type="number"
                  step="0.01"
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                  placeholder="2.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Performance Fee (%)</label>
                <input
                  {...register(`Fund_Fees.${index}.performance_fee`)}
                  type="number"
                  step="0.01"
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                  placeholder="20.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Performance Fee Frequency</label>
                <select {...register(`Fund_Fees.${index}.performance_fee_frequency`)} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Hurdle Rate (%)</label>
                <input
                  {...register(`Fund_Fees.${index}.hurdle`)}
                  type="number"
                  step="0.01"
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                  placeholder="8.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">High Watermark</label>
                <select {...register(`Fund_Fees.${index}.high_watermark`)} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Catch-up Clause</label>
              <select {...register(`Fund_Fees.${index}.catch_up_clause`)} className="w-full border border-[#e5e7eb] rounded px-3 py-2">
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Catch-up Clause Mechanics</label>
              <textarea
                {...register(`Fund_Fees.${index}.catch_up_clause_mechanics`)}
                rows={2}
                className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                placeholder="Explain the catch-up mechanism..."
              />
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addShareClass}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
        >
          + Add Another Share Class
        </button>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => onEdit('fund-details')}
          className="text-gray-600 px-6 py-2 rounded"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Next: Upload Data
        </button>
      </div>
    </div>
  );
};