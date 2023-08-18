import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useMaxlength } from '../src';
import { IUseMaxlengthInput } from '../src/useMaxlength';
import ShowDocs from './util/ShowDocs';

const DemoRequire = () => {
  const maxlengthInput: IUseMaxlengthInput = {
    counterThreshold: 10,
    validate: true,
    utf8: false,
    maxLength: 50,
    initialValue: 'Sample text',
    warningThreshold: 5,
  };

  const { isWarning, counter, isShowCounter, onChange, maxLength, charactersLeft, currentValue } =
    useMaxlength(maxlengthInput);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input type="text" value={currentValue} onChange={handleInputChange} maxLength={maxLength} />
      {isShowCounter && (
        <div className={`counter ${isWarning ? 'warning' : ''}`}>
          Counter: {counter}, Characters left: {charactersLeft}
        </div>
      )}
    </div>
  );
};

storiesOf('State/useMaxlength', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMaxlength.md')} />)
  .add('Demo', () => <DemoRequire />)
  .add('Threshold not reached', () => (
    <CounterTester maxLength={20} initialValue="Hello" counterThreshold={10} />
  ))
  .add('Threshold reached', () => (
    <CounterTester maxLength={20} initialValue="Hello World" counterThreshold={10} />
  ))
  .add('Max length reached', () => (
    <CounterTester initialValue="Hello World, How are you doing today?" maxLength={30} />
  ))
  .add('Max length exceeded', () => (
    <CounterTester
      initialValue="Hello World, How are you doing today? I am doing good."
      maxLength={50}
      validate={true}
    />
  ))
  .add('UTF-8 characters', () => (
    <CounterTester maxLength={20} initialValue="Hello £" utf8={true} />
  ));

const CounterTester = ({
  initialValue,
  counterThreshold,
  maxLength,
  validate,
  utf8,
  warningThreshold,
}: IUseMaxlengthInput) => {
  const {
    counter,
    isShowCounter,
    onChange,
    charactersLeft,
    currentValue,
    isWarning,
    isLimitReached,
    isLimitExceeded,
    maxLength: maxLengthHook,
  } = useMaxlength({ counterThreshold, maxLength, validate, utf8, warningThreshold, initialValue });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={currentValue}
        onChange={handleInputChange}
        maxLength={maxLengthHook}
      />
      {isLimitExceeded ? <div className="error">Limit Exceeded</div> : ''}
      {isLimitReached ? <div className="warning">Limit Reached</div> : ''}
      {isWarning ? <div className="warning">Almost There</div> : ''}
      {isShowCounter && (
        <div className={`counter ${isWarning ? 'warning' : ''}`}>
          Counter: {counter}, Characters left: {charactersLeft}
        </div>
      )}
    </div>
  );
};
