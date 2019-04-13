const parseTimeRanges = ranges => {
  const result: Array<{ start: number; end: number }> = [];

  for (let i = 0; i < ranges.length; i++) {
    result.push({
      start: ranges.start(i),
      end: ranges.end(i),
    });
  }

  return result;
};

export default parseTimeRanges;
