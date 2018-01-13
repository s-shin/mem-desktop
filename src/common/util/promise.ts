export function promisify<Value>(fn: (cb: (err?: any, result?: Value) => void) => void): () => Promise<Value>;
export function promisify<T1, Value>(fn: (a1: T1, cb: (err?: any, result?: Value) => void) => void): (a1: T1) => Promise<Value>;
export function promisify<T1, T2, Value>(fn: (a1: T1, a2: T2, cb: (err?: any, result?: Value) => void) => void): (a1: T1, a2: T2) => Promise<Value>;
export function promisify<T1, T2, T3, Value>(fn: (a1: T1, a2: T2, a3: T3, cb: (err?: any, result?: Value) => void) => void): (a1: T1, a2: T2, a3: T3) => Promise<Value>;
export function promisify<T1, T2, T3, T4, Value>(fn: (a1: T1, a2: T2, a3: T3, a4: T4, cb: (err?: any, result?: Value) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4) => Promise<Value>;
export function promisify<T1, T2, T3, T4, T5, Value>(fn: (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, cb: (err?: any, result?: Value) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => Promise<Value>;
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
