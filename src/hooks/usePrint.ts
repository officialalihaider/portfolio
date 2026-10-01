/** Open the browser print dialog without changing the website theme. */
export function printCvDocument(): void {
  if (typeof window !== 'undefined') window.print();
}
