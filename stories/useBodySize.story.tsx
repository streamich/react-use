import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useBodySize } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { width, height } = useBodySize();

  const exampleText = 'Tristique senectus et netus et malesuada. Ultricies mi quis hendrerit dolor magna eget est lorem. Sapien eget mi proin sed libero enim sed faucibus. Duis ultricies lacus sed turpis tincidunt id aliquet risus. Turpis tincidunt id aliquet risus. Eu tincidunt tortor aliquam nulla. Eu augue ut lectus arcu bibendum at varius vel. Facilisis sed odio morbi quis commodo odio aenean sed adipiscing. Morbi leo urna molestie at elementum eu facilisis sed odio. Et ultrices neque ornare aenean euismod elementum nisi. In ante metus dictum at. Adipiscing elit ut aliquam purus sit amet luctus venenatis. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. A erat nam at lectus urna duis convallis convallis. Euismod lacinia at quis risus sed vulputate odio ut. Ultrices sagittis orci a scelerisque purus semper. Lectus nulla at volutpat diam ut. Egestas fringilla phasellus faucibus scelerisque.'

  return (
    <div>
      <div>width: {width}</div>
      <div>height: {height}</div>
      <div>
        <textarea rows={10} cols={45} defaultValue={exampleText}/>
      </div>
    </div>
  );
};

storiesOf('Sensors|useBodySize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useBodySize.md')} />)
  .add('Demo', () => <Demo />);
