import { storiesOf } from '@storybook/react';
import React from 'react';
import { useError } from '../src';
import ShowDocs from './util/ShowDocs';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Demo = () => {
  const dispatchError = useError();

  const clickHandler = () => {
    dispatchError(new Error('Some error!'));
  };

  return <button onClick={clickHandler}>Click me to throw</button>;
};

storiesOf('Side effects/useError', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useError.md')} />)
  .add('Demo', () => (
    <ErrorBoundary>
      <Demo />
    </ErrorBoundary>
  ));
