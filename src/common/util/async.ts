import { Result } from "./result";

export async function handleError<Value>(p: Promise<Value>) {
  try {
    return Result.value<Value, any>(await p);
  } catch (e) {
    return Result.error<Value, any>(e);
  }
}

export async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });
}

export class Timer {
  private handle?: any;
  private isInterval: boolean;

  isActive() { return this.handle !== undefined; }

  timeout(ms: number) {
    return new Promise((resolve, reject) => {
      if (this.isActive()) {
        return reject("timer is already activated");
      }
      this.isInterval = false;
      this.handle = setTimeout(() => {
        this.handle = undefined;
        resolve();
      }, ms);
    });
  }

  interval(ms: number) {
    return new Promise((resolve, reject) => {
      if (this.isActive()) {
        return reject("timer is already activated");
      }
      this.isInterval = true;
      this.handle = setInterval(() => {
        this.handle = undefined;
        resolve();
      }, ms);
    });
  }

  cancel() {
    if (!this.isActive()) {
      return false;
    }
    if (this.isInterval) {
      clearInterval(this.handle!);
    } else {
      clearTimeout(this.handle!);
    }
    return true;
  }
}
