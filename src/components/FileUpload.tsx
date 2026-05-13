import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Papa from 'papaparse';

interface FileUploadProps {
  name: string;
  templateUrl?: string;
  onParse?: (data: any[]) => void;
  accept?: any; // Use 'any' type to avoid typing conflicts
}

export const FileUpload = ({ name, templateUrl, onParse, accept }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      setImagePreview(null);
      setPreview([]);
      
      if (uploadedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(uploadedFile);
      } else if (uploadedFile.name.endsWith('.csv') && onParse) {
        Papa.parse(uploadedFile, {
          header: true,
          complete: (results) => {
            onParse(results.data);
            setPreview(results.data.slice(0, 5));
          }
        });
      }
    }
  }, [onParse]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    multiple: false,
    accept
  });

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreview([]);
    setImagePreview(null);
  };

  return (
    <div className="space-y-2">
      <div 
        className="border-2 border-dashed border-[#e5e7eb] rounded-lg p-4 cursor-pointer hover:border-[#00ffa3] transition-colors bg-white"
        {...getRootProps()}
      >
        <input {...getInputProps()} name={name} />
        {file ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
            <button
              type="button"
              onClick={clearFile}
              className="text-xs underline text-[#0033a0] ml-2"
            >
              Change
            </button>
          </div>
        ) : isDragActive ? (
          <p className="text-sm text-gray-500">Drop file here...</p>
        ) : (
          <div className="text-center">
            <p className="text-sm text-gray-500">Drag file here or click to browse</p>
            {templateUrl && (
              <a 
                href={templateUrl} 
                download
                className="text-xs text-[#0033a0] underline mt-1 inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                Download template
              </a>
            )}
          </div>
        )}
      </div>
      
      {imagePreview && (
        <div className="mt-2 border border-[#e5e7eb] rounded-lg p-2 bg-white inline-block">
          <img src={imagePreview} alt="Preview" className="max-h-32 max-w-xs rounded" />
        </div>
      )}
      
      {preview.length > 0 && (
        <div className="text-xs bg-[#f5f6fa] p-3 rounded border border-[#e5e7eb]">
          <p className="font-medium mb-1">Preview (first 5 rows):</p>
          <pre className="overflow-x-auto text-[10px]">{JSON.stringify(preview, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Default export for easier import
export default FileUpload;