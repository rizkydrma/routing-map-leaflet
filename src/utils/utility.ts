export function convertTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.ceil(minutes / 60);

  let result = '';
  if (hours > 0) {
    result += `${hours} jam`;
  } else {
    result += `${minutes} mmt`;
  }

  return result;
}
