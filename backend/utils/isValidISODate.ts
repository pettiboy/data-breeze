export function isValidISODate(dateString: string | undefined): boolean {
  if (!dateString) {
    return false;
  }

  // regex for ISO date format (YYYY-MM-DDTHH:MM:SS.SSSZ)
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  return isoDatePattern.test(dateString);
}
