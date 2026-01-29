type FieldMapping = Record<string, string>;

export const validateFieldMapping = (
  previewRows: Record<string, unknown>[],
  fieldMapping: FieldMapping,
): string | null => {
  if (!previewRows.length) {
    return "No data available for mapping.";
  }

  const csvColumns = Object.keys(previewRows[0]);

  const mappedCsvColumns = Object.values(fieldMapping);

  //  Check all CSV columns are mapped
  const unmappedColumns = csvColumns.filter(
    (col) => !mappedCsvColumns.includes(col),
  );

  if (unmappedColumns.length > 0) {
    return "Please map all columns before uploading.";
  }

  //  Check duplicate CSV column usage (safety)
  const duplicateCsvColumns = mappedCsvColumns.filter(
    (col, index) => mappedCsvColumns.indexOf(col) !== index,
  );

  if (duplicateCsvColumns.length > 0) {
    return "Each CSV column can only be mapped once.";
  }

  return null;
};
