# useFakeResources Hook
It takes in an object of `FakeResourcesHookProps` as its parameter, which contains two properties:

* `data`: any: The actual resource that will be displayed after the delay period.
* `delay`: number: The duration, in milliseconds, for which the fake resource will be displayed.
Return Value

The `useFakeResources` hook returns an array of three elements:

* `[0]`: The actual resource, once the delay period is over.  
* `[1]`: A boolean value indicating if the fake resource is still being displayed (true) or if the actual resource is being displayed (false).  
* `[2]`: A function that can be called to manually trigger the display of the actual resource, bypassing the delay period.  


```tsx

import React from 'react';
import useFakeResources from './useFakeResources';

function ExampleComponent() {
  const [resource, loading, triggerLoading] = useFakeResources({
    data: ['item1', 'item2', 'item3'],
    delay: 2000
  });

  return (
    <div>
      {loading ? <p>Loading...</p> : resource.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <button onClick={triggerLoading}>Load Data Now</button>
    </div>
  );
}


```
