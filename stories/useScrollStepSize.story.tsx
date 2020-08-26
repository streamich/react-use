import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useScrollStepSize } from '../src';
import ShowDocs from './util/ShowDocs';

interface ItemScrollProps {
    index: number
    height?: number
}

const ItemScroll: React.FC<ItemScrollProps> = React.memo(({ index, height = 40, ...props }) => {
    return (
        <div style={{ height, width: 500, backgroundColor: index % 2 === 0 ? '#a9a9a9' : ' #d6d6d6' }}  {...props}>
            Item {index}
        </div>
    )
});

const DemoFixedItemHeight = () => {
    const scrollRef = React.useRef(null);
    const [scrollTop, setScrollTop] = useScrollStepSize(scrollRef, 40);

    return (
        <>
            <h4>Items with 40px of height</h4>
            <pre>Scrolltop: {scrollTop}</pre>
            <div ref={scrollRef} style={{ height: '200px', overflow: "auto" }}>
                {new Array(100).fill(0).map((i, idx) => {
                    return <ItemScroll key={idx} index={idx} />
                })}
            </div>
        </>
    )
};

const DemoDynamicItemHeight = () => {
  const scrollRef = React.useRef(null);
  const [items] = React.useState<number[]>(Array.from({ length: 40}, () => (Math.floor(Math.random() * 60) + 30)))
  const [scrollTop] = useScrollStepSize(scrollRef);

  return (
      <>
          <h4>Items with dynamic height (between 30px and 90px)</h4>
          <pre>Scrolltop: {scrollTop}</pre>
          <div ref={scrollRef} style={{ height: '200px', overflow: "auto" }}>
              {items.map((i, idx) => {
                  return <ItemScroll
                            key={idx}
                            index={idx}
                            height={i}
                          />
              })}
          </div>
      </>
  )
};

storiesOf('Sensors/useScrollStepSize', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useScrollStepSize.md')} />)
  .add('Demo Fixed Item Height', () => <DemoFixedItemHeight />)
  .add('Demo Dynamic Item Height', () => <DemoDynamicItemHeight />);
