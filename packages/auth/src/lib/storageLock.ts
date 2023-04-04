// Inspiration & Source: https://github.com/taylorhakes/localstorage-lock
// Modified to support async functions

import { storage } from "../internal";

function getId() {
  return `${Date.now()}:${Math.random()}`;
}

type Options = {
  timeout?: number;
  lockWriteTime?: number;
  checkTime?: number;
  retry?: boolean;
};

type Lock = {
  id: string;
  time: number;
};

export async function runWithLock(
  key: string,
  fn: () => Promise<void>,
  { timeout = 1000, lockWriteTime = 50, checkTime = 10, retry = true }: Options = {}
) {
  const timerRunWithLock = async () =>
    new Promise<void>((r) =>
      setTimeout(async () => {
        await runWithLock.bind(null, key, fn, { timeout, lockWriteTime, checkTime, retry })();
        r();
      }, checkTime)
    );

  const result = await storage.getItem(key);

  if (result) {
    // Check to make sure the lock hasn't expired
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Lock = JSON.parse(result);
    if (data.time >= Date.now() - timeout) {
      if (retry) await timerRunWithLock();
      return;
    } else {
      await storage.setItem(key, "");
    }
  }

  const id = getId();
  await storage.setItem(key, JSON.stringify({ id, time: Date.now() }));

  // Delay a bit, to see if another worker is in this section
  await new Promise<void>((r) =>
    setTimeout(async () => {
      const currentResult = await storage.getItem(key);
      if (!currentResult) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: Lock = JSON.parse(currentResult);

      if (data.id !== id) {
        if (retry) await timerRunWithLock();
        r();
        return;
      }

      try {
        await fn();
      } finally {
        await storage.setItem(key, "");
      }
      r();
    }, lockWriteTime)
  );
}
