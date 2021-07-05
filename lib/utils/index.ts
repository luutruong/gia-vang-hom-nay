import * as https from 'https';

function padZero(num: number): string {
  if (num < 10) {
    return `0${num}`;
  }

  return `${num}`;
}

export function dateFromString(date: string): Date {
  const d = new Date(date);
  if (d.toString() === 'Invalid Date') {
    throw new Error('Invalid Date');
  }

  return d;
}

export function dateToYMD(date: Date): string {
  return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;
}

export async function httpGet(uri: string): Promise<string> {
  return new Promise((resolve) => {
    https.get(uri, (res: any) => {
      let data = '';
      res.on('data', (chunk: string) => {
        data += chunk;
      })

      res.on('end', () => {
        resolve(data);
      })
    });
  });
}
