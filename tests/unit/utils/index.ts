export const getConsoleLogSpy = (): jest.SpyInstance => {
  const spy = jest.spyOn(console, 'log');
  spy.mockImplementation = jest.fn();
  return spy;
};

export const getConsoleErrSpy = (): jest.SpyInstance => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation = jest.fn();
  return spy;
};
