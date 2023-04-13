import { renderHook, act } from '@testing-library/react-hooks';
import {usePagenation} from '../src';



describe('usePagenation Test', () => {
    let hook, params;
    const data = [
        {
            name: '小明',
            age: 18,
            sex: '男',
        },
        {
            name: '小红',
            age: 18,
            sex: '女',
        },
    ]
    const query = (p) => {
        params = p;
        return new Promise((resolve) => {
            const id = setTimeout(() => {
                resolve({ data, total: 2 });
                clearTimeout(id);
            }, 0);
        });
    };

    beforeEach(() => {
        hook = renderHook(({ fn }) => usePagenation(fn, {isAutostart: false}), {
            initialProps: {
                fn: query,
            },
        });
    });
    describe('pagenation Test', () => {
        it('current', () => {
            expect(hook.result.current.current).toBe(1);
        });
        it('pageSize', () => {
            expect(hook.result.current.pageSize).toBe(20);
        });
        it('pageSize', () => {
            expect(hook.result.current.total).toBe(0);
        });
        it('data', () => {
            expect(hook.result.current.data).toEqual([]);
        });
    });

    describe('success', () => {
        it('data', async () => {
            expect.assertions(1);
            const { run } = hook.result.current;
            act(() => {
                run();
            });
            hook.rerender({ fn: query });
            await hook.waitForNextUpdate();
            expect(hook.result.current.data).toEqual(data);
        });
        it('params', async () => {
            expect.assertions(1);
            const { run } = hook.result.current;
            act(() => {
                run({name: '小明'});
            });
            hook.rerender({ fn: query });
            await hook.waitForNextUpdate();
            expect(params).toEqual({ name: '小明', size: 1, page: 20 });
        });

        it('onChange', async () => {
            expect.assertions(3);
            const { onChange } = hook.result.current;
            act(() => {
                onChange(2, 40);
            });
            hook.rerender({ fn: query });
            await hook.waitForNextUpdate();

            expect(hook.result.current.current).toBe(2);
            expect(hook.result.current.pageSize).toBe(40);
            expect(hook.result.current.total).toBe(2);
        });
    })
});