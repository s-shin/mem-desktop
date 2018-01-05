export function promisify<Result>(fn: (cb: (err?: any, result?: Result) => void) => void): () => Promise<Result>;
export function promisify<T1, Result>(fn: (a1: T1, cb: (err?: any, result?: Result) => void) => void): (a1: T1) => Promise<Result>;
export function promisify<T1, T2, Result>(fn: (a1: T1, a2: T2, cb: (err?: any, result?: Result) => void) => void): (a1: T1, a2: T2) => Promise<Result>;
export function promisify<T1, T2, T3, Result>(fn: (a1: T1, a2: T2, a3: T3, cb: (err?: any, result?: Result) => void) => void): (a1: T1, a2: T2, a3: T3) => Promise<Result>;
export function promisify<T1, T2, T3, T4, Result>(fn: (a1: T1, a2: T2, a3: T3, a4: T4, cb: (err?: any, result?: Result) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4) => Promise<Result>;
export function promisify<T1, T2, T3, T4, T5, Result>(fn: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, cb: (err?: any, result?: Result) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => Promise<Result>;
export function promisify(fn: (...args: any[]) => void) {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err?: any, result?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

export async function handleError<Result>(p: Promise<Result>): Promise<[Result | undefined, any | undefined]> {
  try {
    return [await p, undefined];
  } catch (e) {
    return [undefined, e];
  }
}
