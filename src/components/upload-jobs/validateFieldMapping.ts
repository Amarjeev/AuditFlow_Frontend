type FieldMapping = Record<string, string>;

export const validateFieldMapping = (
  previewRows: Record<string, unknown>[],
  fieldMapping: FieldMapping,
): string | null => {
  if (!previewRows.length) {
    return "No data available for mapping.";
  }

  const csvColumns = Object.keys(previewRows[0]);

  // 1️⃣ Check unmapped columns
  const unmappedColumns = csvColumns.filter((col) => !fieldMapping[col]);

  if (unmappedColumns.length > 0) {
    return "Please map all columns before uploading.";
  }

  // 2️⃣ Check duplicate system field selection
  const selectedFields = Object.values(fieldMapping);

  const duplicateFields = selectedFields.filter(
    (field, index) => selectedFields.indexOf(field) !== index,
  );

  if (duplicateFields.length > 0) {
    return "Each system field can only be mapped once.";
  }

  return null;
};
