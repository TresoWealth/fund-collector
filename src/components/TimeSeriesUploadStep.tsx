import { useFormContext } from 'react-hook-form';
import { FileUpload } from './FileUpload';
import { validateCSVTemplate } from '../utils/validators';

interface Props {
  onComplete: () => void;
  onEdit: (step: string) => void;
}

export const TimeSeriesUploadStep = ({ onComplete, onEdit }: Props) => {
  const { setValue } = useFormContext();

  const handleNAVUpload = (parsedData: any[]) => {
    if (validateCSVTemplate(parsedData, ['date', 'nav'])) {
      setValue('raw_nav_time_series', parsedData);
    }
  };

  const handleBenchmarkUpload = (parsedData: any[]) => {
    if (validateCSVTemplate(parsedData, ['date', 'index_name', 'close_value'])) {
      setValue('raw_benchmark_time_series', parsedData);
    }
  };

  const handleHoldingsUpload = (parsedData: any[]) => {
    // Holdings can have flexible columns, just capture the data
    setValue('raw_holdings', parsedData);
  };

  const handleSectorsUpload = (parsedData: any[]) => {
    setValue('raw_sectors', parsedData);
  };

  const handleCompositionUpload = (parsedData: any[]) => {
    setValue('raw_composition', parsedData);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#0033a0]">Step 4: Upload Time-Series Data</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Daily NAV Data (Fund_NAV)</h3>
          <FileUpload
            name="nav_file"
            templateUrl="/templates/nav_template.csv"
            onParse={handleNAVUpload}
            accept=".csv"
          />
          <div className="mt-3 text-xs text-gray-600">
            <p>Columns required: <code>date, nav</code></p>
            <p>Date format: YYYY-MM-DD</p>
          </div>
        </div>

        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Benchmark Data (Benchmark_Data)</h3>
          <FileUpload
            name="benchmark_file"
            templateUrl="/templates/benchmark_template.csv"
            onParse={handleBenchmarkUpload}
            accept=".csv"
          />
          <div className="mt-3 text-xs text-gray-600">
            <p>Columns required: <code>date, index_name, close_value</code></p>
          </div>
        </div>

        <div className="border bg-white	border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Current Holdings (Fund_Holdings)</h3>
          <FileUpload
            name="holdings_file"
            templateUrl="/templates/holdings_template.csv"
            onParse={handleHoldingsUpload}
            accept=".csv,.xlsx"
          />
          <div className="mt-3 text-xs text-gray-600">
            <p>Columns: <code>security_name, security_weight, security_sector, holding_rank</code></p>
          </div>
        </div>

        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Sector Allocation (Fund_Sectors)</h3>
          <FileUpload
            name="sectors_file"
            templateUrl="/templates/sectors_template.csv"
            onParse={handleSectorsUpload}
            accept=".csv,.xlsx"
          />
          <div className="mt-3 text-xs text-gray-600">
            <p>Columns: <code>sector_name, sector_weight, sub_sectors</code></p>
          </div>
        </div>

        <div className="border bg-white border-[#e5e7eb] rounded-lg p-6 shadow-sm md:col-span-2">
          <h3 className="text-lg font-medium mb-4">Portfolio Composition History</h3>
          <FileUpload
            name="composition_file"
            templateUrl="/templates/composition_template.csv"
            onParse={handleCompositionUpload}
            accept=".csv"
          />
          <div className="mt-3 text-xs text-gray-600">
            <p>Columns: <code>date, equity_pct, debt_pct, cash_pct, other_pct</code></p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => onEdit('fee-structure')}
          className="text-gray-600 px-6 py-2 rounded"
        >
          ← Back
        </button>
        <button
          onClick={onComplete}
          className="bg-[#00ffa3] text-[#18191b] px-8 py-3 rounded font-medium hover:bg-[#00e094]"
        >
          Next: Monthly Update
        </button>
      </div>
    </div>
  );
};