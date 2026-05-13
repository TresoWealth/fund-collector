import React, { useState, useEffect } from 'react';
import { FormProvider, useForm, FieldValues } from 'react-hook-form';
import { AMCDetailsStep } from './AMCDetailsStep';
import { FundDetailsStep } from './FundDetailsStep';
import { FeeStructureStep } from './FeeStructureStep';
import { TimeSeriesUploadStep } from './TimeSeriesUploadStep';
import { MonthlyUpdateStep } from './MonthlyUpdateStep';
import { ReviewSubmitStep } from './ReviewSubmitStep';
import { useLocalSave } from '../hooks/useLocalSave';
import { generateAmcId, generateFundId } from '../utils/idGenerator';

type Step = 'amc-details' | 'fund-details' | 'fee-structure' | 'upload-data' | 'monthly-update' | 'review';

export const FundDataCollector = () => {
  const [currentStep, setCurrentStep] = useState<Step>('amc-details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Use FieldValues type for maximum flexibility
  const methods = useForm<FieldValues>({ mode: 'onBlur' });
  const { clearSave } = useLocalSave(methods, 'treso-fund-data');

  // Auto-generate IDs when names change - use string-based watch
  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'amc_name' && value.amc_name) {
        methods.setValue('amc_id', generateAmcId(value.amc_name as string));
      }
      if ((name === 'amc_name' || name === 'scheme_name') && value.amc_name && value.scheme_name) {
        methods.setValue('fund_id', generateFundId(value.amc_name as string, value.scheme_name as string));
      }
    });
    
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleStepComplete = (nextStep: Step) => {
    setCurrentStep(nextStep);
    window.scrollTo(0, 0);
  };

  const handleEdit = (step: string) => {
    setCurrentStep(step as Step);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: FieldValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare submission data with guaranteed IDs
      const submissionData: FieldValues = {
        ...data,
        amc_id: data.amc_id || generateAmcId((data.amc_name as string) || ''),
        fund_id: data.fund_id || ((data.amc_name as string) && (data.scheme_name as string) ? 
          generateAmcId(data.amc_name as string) + '_' + generateFundId(data.amc_name as string, data.scheme_name as string) : '')
      };

      // Create payload
      const payload = new FormData();
      payload.append('data', JSON.stringify(submissionData));
      
      // Handle file uploads - convert to base64
      const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
      for (const input of Array.from(fileInputs)) {
        if (input.files?.length) {
          const file = input.files[0];
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          payload.append(input.name, base64);
        }
      }

      // Submit to Google Apps Script
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwj2CGxspZZP7lHSILBCVruZHrUmRzBVtqQSn9g6SZvEJHU5V3A2k52S5NGevbxDfNTZw/exec',
        {
          method: 'POST',
          body: payload,
        }
      );

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Submission failed: ' + JSON.stringify(result));
      }

      // Success
      clearSave();
      setSubmitted(true);
      methods.reset();
      window.scrollTo(0, 0);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // If submitted, show success and stop rendering the form
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
            onClick={() => {
              setSubmitted(false);
              setCurrentStep('amc-details');
              methods.reset();
            }}
            className="mt-8 bg-[#0033a0] text-white px-6 py-3 rounded font-medium hover:bg-[#002680]"
          >
            Submit Another Fund
          </button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'amc-details':
        return <AMCDetailsStep onComplete={() => handleStepComplete('fund-details')} />;
      case 'fund-details':
        return <FundDetailsStep 
                 onComplete={() => handleStepComplete('fee-structure')} 
                 onEdit={handleEdit} 
               />;
      case 'fee-structure':
        return <FeeStructureStep 
                 onComplete={() => handleStepComplete('upload-data')} 
                 onEdit={handleEdit} 
               />;
      case 'upload-data':
        return <TimeSeriesUploadStep 
                 onComplete={() => handleStepComplete('monthly-update')} 
                 onEdit={handleEdit} 
               />;
      case 'monthly-update':
        return <MonthlyUpdateStep 
                 onComplete={() => handleStepComplete('review')} 
                 onEdit={handleEdit} 
               />;
      case 'review':
        return <ReviewSubmitStep onSubmit={handleSubmit} onEdit={handleEdit} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          {[
            { key: 'amc-details', label: '1. AMC Details' },
            { key: 'fund-details', label: '2. Fund Details' },
            { key: 'fee-structure', label: '3. Fee Structure' },
            { key: 'upload-data', label: '4. Upload Data' },
            { key: 'monthly-update', label: '5. Monthly Update' },
            { key: 'review', label: '6. Review' }
          ].map((step) => (
            <div key={step.key} className="flex-1">
              <div className={`h-2 rounded-full ${
                currentStep === step.key ? 'bg-[#00ffa3]' : 'bg-gray-200'
              }`} />
              <p className="text-sm mt-2 text-center text-gray-600">{step.label}</p>
            </div>
          ))}
        </div>

        {renderStep()}
      </div>
    </FormProvider>
  );
};