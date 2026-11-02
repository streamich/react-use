import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import useAudio from '../src/useAudio';
import useVideo from '../src/useVideo';

describe.each(['audio', 'video'] as const)('preloaded %s metadata', (tag) => {
  describe.each(['props', 'element'])('using %s', (inputType) => {
    let readyState: jest.SpyInstance;
    let duration: jest.SpyInstance;
    let buffered: jest.SpyInstance;
    const onDurationChange = jest.fn();
    const useMedia = tag === 'audio' ? useAudio : useVideo;
    const ranges = {
      length: 1,
      start: () => 0,
      end: () => 40,
    };

    beforeEach(() => {
      readyState = jest.spyOn(HTMLMediaElement.prototype, 'readyState', 'get').mockReturnValue(1);
      duration = jest.spyOn(HTMLMediaElement.prototype, 'duration', 'get').mockReturnValue(120);
      buffered = jest.spyOn(HTMLMediaElement.prototype, 'buffered', 'get').mockReturnValue(ranges);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    const setUp = () => {
      let current: ReturnType<typeof useMedia>;
      const TestComponent = ({ src }: { src: string }) => {
        const props = { src, preload: 'metadata', onDurationChange };
        current = useMedia(inputType === 'props' ? props : React.createElement(tag, props));
        return current[0];
      };
      const view = render(<TestComponent src="initial.mp3" />);

      return {
        get current() {
          return current;
        },
        element: view.container.querySelector(tag)!,
        rerender: (src: string) => view.rerender(<TestComponent src={src} />),
      };
    };

    it('reads metadata already available at mount without calling the event handler', () => {
      const media = setUp();

      expect(media.current[1].duration).toBe(120);
      expect(media.current[1].buffered).toEqual([{ start: 0, end: 40 }]);
      expect(onDurationChange).not.toHaveBeenCalled();

      media.current[2].seek(30);
      expect(media.element.currentTime).toBe(30);
    });

    it('keeps the initial duration until metadata is available and handles later changes', () => {
      readyState.mockReturnValue(0);
      duration.mockReturnValue(NaN);
      buffered.mockReturnValue({ length: 0 });
      const media = setUp();

      expect(media.current[1].duration).toBe(0);
      expect(media.current[1].buffered).toEqual([]);

      readyState.mockReturnValue(1);
      duration.mockReturnValue(90);
      buffered.mockReturnValue(ranges);
      fireEvent.durationChange(media.element);

      expect(media.current[1].duration).toBe(90);
      expect(media.current[1].buffered).toEqual([{ start: 0, end: 40 }]);
      expect(onDurationChange).toHaveBeenCalledTimes(1);
    });

    it('reads metadata already available when the source changes', () => {
      const media = setUp();
      readyState.mockReturnValue(4);
      duration.mockReturnValue(60);
      buffered.mockReturnValue({ ...ranges, end: () => 20 });

      media.rerender('next.mp3');

      expect(media.current[1].duration).toBe(60);
      expect(media.current[1].buffered).toEqual([{ start: 0, end: 20 }]);
    });

    it('clears the previous metadata when the new source has not loaded yet', () => {
      const media = setUp();
      fireEvent.durationChange(media.element);
      readyState.mockReturnValue(0);
      duration.mockReturnValue(NaN);
      buffered.mockReturnValue({ length: 0 });

      media.rerender('next.mp3');

      expect(media.current[1].duration).toBe(0);
      expect(media.current[1].buffered).toEqual([]);
    });
  });
});
