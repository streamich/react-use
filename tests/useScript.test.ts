import { renderHook, act } from '@testing-library/react-hooks';
import { default as useScript, LoadScriptOptions, makeScript } from '../src/useScript';

function setUp(url: string, options?: LoadScriptOptions) {
	return renderHook(() => useScript(url, options))
};

it('useScript load success', async (done) => {
  const scriptId = 'useScript_load_success';
  const { result } = setUp('mockUrl', {
    onLoad: () =>{
      done();
    },
    id: scriptId
  });
  expect(result.current.ready).toBe(false);
  expect(result.current.failed).toBe(false);
  const ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new Event('load'))
  });
  
  expect(result.current.ready).toBe(true);
  expect(result.current.failed).toBe(false);
});

it('useScript load failed', async (done) => {
  const scriptId = 'script2';
  const { result } = setUp('mockUrl', {
    onError: () => {
      done();
    },
    id: scriptId
  });
  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  const ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new ErrorEvent('error'))
  });
  
  expect(result.current.ready).toBe(false);
  expect(result.current.failed).toBeTruthy();
});

it('useScript load aborted', async (done) => {
  const scriptId = 'useScript_load_aborted';
  const { result } = setUp('mockUrl', {
    onAbort: () => {
      done();
    },
    id: scriptId
  });
  
  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  const ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new UIEvent('abort'))
  });
  
  expect(result.current.ready).toBe(false);
  expect(result.current.failed).toBeTruthy();
});



it('makeScript load success', async (done) => {
  const scriptId = 'makeScript_load_success';
  const script = makeScript('mockUrl', {
    onLoad: () =>{
      done();
    },
    id: scriptId
  });
  
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  script.load();
  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new Event('load'))
  });
  expect(script.ready).toBeTruthy();
  expect(script.failed).toBeFalsy();
});

it('makeScript load failed', async (done) => {
  const scriptId = 'makeScript_load_failed';
  const script = makeScript('mockUrl', {
    onError: () => {
      done();
    },
    id: scriptId
  });
  
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  script.load();
  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new ErrorEvent('error'))
  });
  expect(script.ready).toBeFalsy();
  expect(script.failed).toBeTruthy();
});

it('makeScript load aborted', async (done) => {
  const scriptId = 'makeScript_load_aborted';
  const script = makeScript('mockUrl', {
    onAbort: () => {
      done();
    },
    id: scriptId
  });
  
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  script.load();
  ele = document.querySelector(`#${scriptId}`);

  expect(ele).toBeDefined();
  act(() => {
    ele.dispatchEvent(new Event('abort'))
  });
  expect(script.ready).toBeFalsy();
  expect(script.failed).toBeTruthy();
});

it('makeScript with hook preload', async (done) => {
  const scriptId = 'makeScript_with_hook_preload';
  const useMockScript = makeScript('mockUrl', {
    onLoad: () =>{
      done();
    },
    id: scriptId
  });
  
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  act(() => useMockScript.load());
  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  const { result } = renderHook(() => useMockScript());

  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
  act(() => {
    ele.dispatchEvent(new Event('load'))
  });
  expect(result.current.ready).toBeTruthy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
});

it('makeScript with hook lazyload', async (done) => {
  const scriptId = 'makeScript_with_hook_lazyload';
  const useMockScript = makeScript('mockUrl', {
    onLoad: () =>{
      done();
    },
    id: scriptId
  });
  
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  const { result } = renderHook(() => useMockScript());

  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();

  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
  act(() => {
    ele.dispatchEvent(new Event('load'))
  });
  expect(result.current.ready).toBeTruthy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
});

it('makeScript with hook load failed', async (done) => {
  const scriptId = 'makeScript_with_hook_load_failed';
  const useMockScript = makeScript('mockUrl', {
    onError: () => {
      done();
    },
    id: scriptId
  });
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();
  
  const { result } = renderHook(() => useMockScript());

  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();

  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
  act(() => {
    ele.dispatchEvent(new ErrorEvent('error'))
  });
  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeTruthy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
});

it('makeScript with hook load aborted', async (done) => {
  const scriptId = 'makeScript_with_hook_load_aborted';
  const useMockScript = makeScript('mockUrl', {
    onAbort: () => {
      done();
    },
    id: scriptId
  });
  let ele = document.querySelector<HTMLScriptElement>(`#${scriptId}`) as any;

  expect(ele).toBeNull();
  
  const { result } = renderHook(() => useMockScript());

  ele = document.querySelector<HTMLScriptElement>(`#${scriptId}`);
  expect(ele).toBeDefined();

  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeFalsy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)

  act(() => {
    ele.dispatchEvent(new UIEvent('abort'))
  });
  
  expect(result.current.ready).toBeFalsy();
  expect(result.current.failed).toBeTruthy();
  expect(useMockScript.ready).toEqual(result.current.ready)
  expect(useMockScript.failed).toEqual(result.current.failed)
});

it('unload script should keep state before unload', () => {
  const scriptId = 'unload_script_should_keep_state_before_unload';
  const script = makeScript('mockUrl', {
    id: scriptId
  });
  let ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeNull();

  script.load();

  ele = document.querySelector(`#${scriptId}`) as any;
  expect(ele).toBeDefined();
  expect(script.ready).toBeFalsy();
  expect(script.failed).toBeFalsy();
  script.unload();
  act(() => {
    ele.dispatchEvent(new Event('load'))
  });
  expect(script.ready).toBeFalsy();
  act(() => {
    ele.dispatchEvent(new ErrorEvent('error'))
  });
  expect(script.failed).toBeFalsy();
});
