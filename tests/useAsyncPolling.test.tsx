jest.mock('../src/misc/sleep', () => ({
  sleep: jest.fn(),
}));

import { renderHook } from '@testing-library/react-hooks';
import useAsyncPolling, { MaxAttemptsError } from '../src/useAsyncPolling';
import { sleep } from '../src/misc/sleep';

describe('useAsyncPolling', () => {
  let hook;

  function createResolver(responses: string[]) {
    responses = [...responses];

    const resolver = async (next) => {
      return new Promise((resolve, reject) => {
        const wait = setTimeout(() => {
          clearTimeout(wait);

          const response = responses.shift();

          if (response === 'throw') reject(new Error('Oops'));

          return resolve(response === 'waiting' ? next(response) : response);
        }, 0);
      });
    };

    return resolver;
  }

  function createRenderHook(options, responses: string[]) {
    const resolver = createResolver(responses);

    return renderHook(
      ({ options, fn }) => {
        return useAsyncPolling(options, fn, [fn]);
      },
      {
        initialProps: {
          options,
          fn: resolver,
        },
      }
    );
  }

  it('should be defined', () => {
    expect(useAsyncPolling).toBeDefined();
  });

  it('initially starts loading', async () => {
    const hook = createRenderHook({}, []);
    await hook.waitForNextUpdate();
  });

  it('resolves after polling', async () => {
    const responses = ['waiting', 'waiting', 'waiting', 'waiting', 'finished'];
    const hook = createRenderHook({}, responses);

    for (let attempt = 0; attempt < responses.length; attempt++) {
      expect(hook.result.current.loading).toBe(true);
      expect(hook.result.current.value).toEqual(undefined);
      expect(hook.result.current.error).toEqual(undefined);
      expect(hook.result.current.attempt).toEqual(attempt + 1);
      expect(hook.result.current.results).toEqual(responses.slice(0, attempt));
      expect(hook.result.current.currentResult).toEqual(attempt ? 'waiting' : undefined);

      await hook.waitForNextUpdate();

      expect(sleep).lastCalledWith(2000);
    }

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.value).toEqual(`finished`);
    expect(hook.result.current.error).toEqual(undefined);
    expect(hook.result.current.attempt).toEqual(responses.length);
  });

  it('resolves after polling with custom intervals', async () => {
    const responses = ['waiting', 'finished'];
    const hook = createRenderHook({ interval: 1000 }, responses);

    for (let attempt = 0; attempt < responses.length; attempt++) {
      expect(hook.result.current.loading).toBe(true);
      expect(hook.result.current.value).toEqual(undefined);
      expect(hook.result.current.error).toEqual(undefined);
      expect(hook.result.current.attempt).toEqual(attempt + 1);
      expect(hook.result.current.results).toEqual(responses.slice(0, attempt));
      expect(hook.result.current.currentResult).toEqual(attempt ? 'waiting' : undefined);

      await hook.waitForNextUpdate();

      expect(sleep).lastCalledWith(1000);
    }

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.value).toEqual(`finished`);
    expect(hook.result.current.error).toEqual(undefined);
    expect(hook.result.current.attempt).toEqual(responses.length);
  });

  it('fails if reaches maxAttempts', async () => {
    const responses = ['waiting', 'waiting', 'waiting', 'finished'];
    const hook = createRenderHook({ interval: 1000, maxAttempts: 3 }, responses);

    for (let attempt = 0; attempt < 3; attempt++) {
      expect(hook.result.current.loading).toBe(true);
      expect(hook.result.current.value).toEqual(undefined);
      expect(hook.result.current.error).toEqual(undefined);
      expect(hook.result.current.attempt).toEqual(attempt + 1);
      expect(hook.result.current.results).toEqual(responses.slice(0, attempt));
      expect(hook.result.current.currentResult).toEqual(attempt ? 'waiting' : undefined);

      await hook.waitForNextUpdate();

      expect(sleep).lastCalledWith(1000);
    }

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.value).toEqual(undefined);
    expect(hook.result.current.error).toEqual(new MaxAttemptsError(`Max attempts exceeded`));
    expect(hook.result.current.attempt).toEqual(3);
    expect(hook.result.current.results).toEqual(['waiting', 'waiting', 'waiting']);
  });

  it('allows passing interval function', async () => {
    const responses = ['waiting', 'waiting', 'waiting', 'waiting', 'finished'];
    const hook = createRenderHook({ interval: (attempt: number) => attempt * 1000 }, responses);

    for (let attempt = 0; attempt < responses.length; attempt++) {
      expect(hook.result.current.loading).toBe(true);
      expect(hook.result.current.value).toEqual(undefined);
      expect(hook.result.current.error).toEqual(undefined);
      expect(hook.result.current.attempt).toEqual(attempt + 1);
      expect(hook.result.current.results).toEqual(responses.slice(0, attempt));
      expect(hook.result.current.currentResult).toEqual(attempt ? 'waiting' : undefined);

      await hook.waitForNextUpdate();

      if (attempt < 4) expect(sleep).lastCalledWith((attempt + 1) * 1000);
    }

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.value).toEqual(`finished`);
    expect(hook.result.current.error).toEqual(undefined);
    expect(hook.result.current.attempt).toEqual(responses.length);
  });

  it('fails if callback rejects', async () => {
    const responses = ['waiting', 'waiting', 'throw', 'finished'];
    const hook = createRenderHook({ interval: 1000, maxAttempts: 3 }, responses);

    for (let attempt = 0; attempt < 3; attempt++) {
      expect(hook.result.current.loading).toBe(true);
      expect(hook.result.current.value).toEqual(undefined);
      expect(hook.result.current.error).toEqual(undefined);
      expect(hook.result.current.attempt).toEqual(attempt + 1);
      expect(hook.result.current.results).toEqual(responses.slice(0, attempt));
      expect(hook.result.current.currentResult).toEqual(attempt ? 'waiting' : undefined);

      await hook.waitForNextUpdate();

      expect(sleep).lastCalledWith(1000);
    }

    expect(hook.result.current.loading).toBe(false);
    expect(hook.result.current.value).toEqual(undefined);
    expect(hook.result.current.error).toEqual(new Error(`Oops`));
    expect(hook.result.current.attempt).toEqual(3);
    expect(hook.result.current.results).toEqual(['waiting', 'waiting']);
  });
});
