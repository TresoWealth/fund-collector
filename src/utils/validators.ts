export const validateCSVTemplate = (data: any[], requiredColumns: string[]) => {
  if (!data || data.length === 0) return false;
  
  const firstRow = data[0];
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    alert(`CSV missing required columns: ${missingColumns.join(', ')}`);
    return false;
  }
  return true;
};