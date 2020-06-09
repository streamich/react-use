import React from 'react';
import { cleanup, waitFor, render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import useIdle from '../src/useIdle';

expect.extend({ toBeInTheDocument });

test('useIdle test', async () => {
  const MockComponent = () => {
    const isIdle = useIdle();
    return <div>{isIdle ? <div data-testid="idle">user idle</div> : <div data-testid="active">user active</div>}</div>;
  };
  jest.useFakeTimers();
  const { queryByTestId } = render(<MockComponent />);
  expect(queryByTestId('active')).toBeInTheDocument();
  expect(queryByTestId('idle')).not.toBeInTheDocument();
  jest.runAllTimers();
  await waitFor(() => {
    expect(queryByTestId('active')).not.toBeInTheDocument();
    expect(queryByTestId('idle')).toBeInTheDocument();
  });
  cleanup();
});
