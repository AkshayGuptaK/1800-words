import Reader from 'line-by-line';

export function readFile(
  path: string,
  onError: (err: Error) => void,
  onLineData: (data: string) => void,
  onEnd: () => void
): void {
  const lr = new Reader(path);
  lr.on('error', onError);
  lr.on('line', onLineData);
  lr.on('end', onEnd);
}
