/**
 * Converts a zero-based list index into a readable sequence label.
 * Values keep a minimum of two digits without breaking after item 99.
 */
export function formatSequenceNumber(index) {
  return String(index + 1).padStart(2, '0');
}
