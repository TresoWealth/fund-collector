import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

interface Props {
  onSubmit: (data: any) => void;
  onEdit: (step: string) => void;
}

export const ReviewSubmitStep = ({ onSubmit, onEdit }: Props) => {
  const { getValues } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const data = getValues();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitted(true);
      // Scroll to top of page
      window.scrollTo(0, 0);
    } catch (error) {
      alert('Submission failed. Please try again.');
      console.error('Submission error:', error);
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="border bg-white border-[#00ffa3] rounded-lg p-8 shadow-sm">
          <div className="text-green-600 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold text-[#0033a0] mb-6">Submitted Successfully!</h2>
          <div className="text-left space-y-4 text-gray-700 leading-relaxed">
            <p>We've received your fund data—thank you!</p>
            <p>Our team is now reviewing your submission to ensure everything is ready for a successful listing on our platform. We look forward to partnering with you and will be in touch once the listing is live on our platform or if we require any additional information.</p>
            <p className="mt-6">Best regards,<br/>The TresoWealth Team</p>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="mt-8 bg-[#0033a0] text-white px-6 py-3 rounded font-medium hover:bg-[#002680]"
          >
            Submit Another Fund
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 6: Review & Submit</h2>

      <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Data Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Fund ID:</span>
            <span className="font-mono text-xs">{data.fund_id || 'Auto-generating...'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Fund Name:</span>
            <span>{data.scheme_name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">AMC:</span>
            <span>{data.amc_name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Product Type:</span>
            <span>{data.product_name || 'Not provided'}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Share Classes:</span>
            <span>{data.Fund_Fees?.length || 0} defined</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">NAV Data Points:</span>
            <span>{data.raw_nav_time_series?.length || 0} records</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Current AUM:</span>
            <span>₹ {data.Performance_Metrics?.aum || 'Not provided'} Cr</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium">Current NAV:</span>
            <span>{data.Performance_Metrics?.nav || 'Not provided'}</span>
          </div>
        </div>
      </div>

      <div className="border bg-yellow-50 border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          ⚠️ Please review all data before submitting. You can go back to any step to make changes.
        </p>
      </div>

      <div className="flex justify-between">
        <div className="space-x-3">
          <button
            onClick={() => onEdit('monthly-update')}
            className="text-gray-600 px-6 py-2 rounded hover:bg-gray-100"
          >
            ← Edit Monthly Update
          </button>
          <button
            onClick={() => onEdit('upload-data')}
            className="text-gray-600 px-6 py-2 rounded hover:bg-gray-100"
          >
            Edit Upload Data
          </button>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit to TresoWealth'}
        </button>
      </div>
    </div>
  );
};