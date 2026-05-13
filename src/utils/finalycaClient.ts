// Optional: Mock function for Finalyca search
export const searchFinalycaFunds = async (searchTerm: string) => {
  if (!searchTerm) return [];
  
  // This is a mock - replace with actual API call when you have Finalyca access
  return [
    {
      scheme_id: 12345,
      scheme_name: "Sample Fund",
      scheme_code: "SAMPLE123",
      amc_id: 678,
      amc_name: "Sample AMC",
      product_code: "PMS",
      scheme_inception_date: "2020-01-01",
      scheme_benchmark_name: "NIFTY 500",
      scheme_classification: "Equity: Multi Cap",
      scheme_assetclass: "Equity"
    }
  ];
};