# `useStatesValidator`

Create array that contain values that you want to verify.
Defines objects within an array.
Set the name key of the object to match the name of the input, make the value an object, and add minlength, maxlength, required, regular expression pattern, and error message.
It operates on one or more input and has a set basic error message.
If you want to change the error message, insert the error message directly into the value of the object.

In each input tag, add "state.inputname.value" and "handleOnChange" to return state from useStatesValidator.
In state object, the name of the input is the key value, and in the object of that key there are value and error values.

## Usage

```ts
import React from "react";
import styled from "styled-components";
import { useStatesValidator } from "react-use";

const TestBlock = styled.div`
  display: flex;
  flex-direction: column;
  input.red {
    background-color: red;
  }
`;

interface IProps {}

const schema = [
  { name: "firstName", required: true, maxlength: 2 },
  { name: "familyName", required: true, minlength: 2 },
  { name: "address", pattern: /^\d{10}$/, message: "helloWorld!" },
  { name: "phone", phone: true },
  { name: "email", email: true, message: "this is email" }
];

const test: React.FC<IProps> = () => {
  const [state, handleOnChange] = useStatesValidator(schema);
  return (
    <TestBlock>
      <div>
        <input
          className={state.firstName.error && "red"}
          type="text"
          name="firstName"
          value={state.firstName.value}
          onChange={handleOnChange}
        />
        {state.firstName.error && <span>{state.firstName.error}</span>}
      </div>
      <div>
        <input
          className={state.familyName.error && "red"}
          type="text"
          name="familyName"
          value={state.familyName.value}
          onChange={handleOnChange}
        />
        {state.familyName.error && <span>{state.familyName.error}</span>}
      </div>
      <div>
        <input
          className={state.address.error && "red"}
          type="text"
          name="address"
          value={state.address.value}
          onChange={handleOnChange}
        />
        {state.address.error && <span>{state.address.error}</span>}
      </div>
      <div>
        <input
          className={state.phone.error && "red"}
          type="text"
          name="phone"
          value={state.phone.value}
          onChange={handleOnChange}
        />
        {state.phone.error && <span>{state.phone.error}</span>}
      </div>
      <div>
        <input
          className={state.email.error && "red"}
          type="text"
          name="email"
          value={state.email.value}
          onChange={handleOnChange}
        />
        {state.email.error && <span>{state.email.error}</span>}
      </div>
    </TestBlock>
  );
};

export default test;
```

## Reference

```ts
const [state, handleOnChange] = useStatesValidator(validateState);
```

- **`validateState`**_`: [array]`_ You must put in array to check the velidation.;
