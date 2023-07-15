export function convertTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.ceil(minutes / 60);

  let result = '';
  if (hours > 0) {
    result += `${hours} jam`;
  } else {
    result += `${minutes} mnt`;
  }

  return result;
}

export function convertDistance({ distance, type }: { distance: number; type: 'm' | 'km' }): string {
  if (!distance) return `0km`;

  const unit = {
    m: 1,
    km: 1000,
  };

  return `${Number(distance / unit[type]).toFixed(1)} ${type}`;
}
