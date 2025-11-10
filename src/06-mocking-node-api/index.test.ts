import { doStuffByTimeout, doStuffByInterval } from './index';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 1000);

    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 500);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1000);

    jest.advanceTimersByTime(1000);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 500);

    jest.advanceTimersByTime(1500);
    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
