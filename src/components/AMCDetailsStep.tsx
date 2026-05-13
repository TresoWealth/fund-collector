import { useFormContext, useFieldArray } from 'react-hook-form';
import { FileUpload } from './FileUpload';
import { useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

export const AMCDetailsStep = ({ onComplete }: Props) => {
  const { register, watch, control } = useFormContext();
  const amcName = watch('amc_name');

  // Support multiple fund managers
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'Fund_Manager_Details'
  });

  // Add first manager by default if none exist
  useEffect(() => {
    if (fields.length === 0) {
      append({
        fund_manager_name: '',
        fund_manager_designation: '',
        fund_manager_from: '',
        fund_manager_image: '',
        educational_background: '',
        previous_experience: ''
      });
    }
  }, [fields.length, append]);

  const addManager = () => {
    append({
      fund_manager_name: '',
      fund_manager_designation: '',
      fund_manager_from: '',
      fund_manager_image: '',
      educational_background: '',
      previous_experience: ''
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 1: AMC Details</h2>
      
      {/* Hidden auto-generated field */}
      <input type="hidden" {...register('amc_id')} />
      
      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">AMC Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">AMC Name *</label>
            <input
              {...register('amc_name', { required: true })}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="e.g., 2Point2 Capital"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">AMC SEBI Registration No.</label>
            <input
              {...register('amc_sebi_no')}
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="INP0000xxxxx"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">AMC Website</label>
            <input
              {...register('amc_website')}
              type="url"
              className="w-full border border-[#e5e7eb] rounded px-3 py-2"
              placeholder="https://amc-website.com"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">AMC Info (Optional)</label>
          <textarea
            {...register('amc_info')}
            rows={3}
            className="w-full border border-[#e5e7eb] rounded px-3 py-2"
            placeholder="Additional information about the AMC, history, team size, etc."
          />
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">AMC Logo</label>
          <FileUpload
            name="amc_logo_file"
            accept="image/*"
          />
        </div>
      </div>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Fund Manager Details</h3>
          <button
            type="button"
            onClick={addManager}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            + Add Manager
          </button>
        </div>
        
        <div className="space-y-6">
          {fields.map((field: any, index: number) => (
            <div key={field.id} className="border-t pt-4 first:border-t-0 first:pt-0">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Manager {index + 1}</h4>
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
                  <label className="block text-sm font-medium mb-1">Fund Manager Name *</label>
                  <input
                    {...register(`Fund_Manager_Details.${index}.fund_manager_name`, { required: true })}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Designation</label>
                  <input
                    {...register(`Fund_Manager_Details.${index}.fund_manager_designation`)}
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                    placeholder="e.g., CIO, Fund Manager"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">From Date</label>
                  <input
                    {...register(`Fund_Manager_Details.${index}.fund_manager_from`)}
                    type="date"
                    className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Manager Image</label>
                  <FileUpload
                    name={`Fund_Manager_Details.${index}.fund_manager_image_file`}
                    accept="image/*"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Educational Background</label>
                <textarea
                  {...register(`Fund_Manager_Details.${index}.educational_background`)}
                  rows={2}
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Previous Experience</label>
                <textarea
                  {...register(`Fund_Manager_Details.${index}.previous_experience`)}
                  rows={2}
                  className="w-full border border-[#e5e7eb] rounded px-3 py-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Next: Fund Details
        </button>
      </div>
    </div>
  );
};