export const generateAmcId = (amcName: string): string => {
  return amcName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters but keep spaces
    .replace(/\s+/g, '_'); // Replace spaces with underscores
};

export const generateFundId = (amcName: string, fundName: string): string => {
  const amcPart = generateAmcId(amcName);
  const fundPart = fundName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_');
  return `${amcPart}_${fundPart}`;
};