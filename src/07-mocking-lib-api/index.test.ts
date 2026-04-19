import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
let mockGet: jest.Mock;

beforeEach(() => {
  mockGet = jest.fn();
  mockedAxios.create.mockReturnValue({
    get: mockGet,
  } as unknown as AxiosInstance);
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    mockGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockGet.mockResolvedValue({ data: {} });
    const relativePath = '/posts';

    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const testData = [{ id: 1, title: 'Test' }];
    mockGet.mockResolvedValue({ data: testData });

    const result = await throttledGetDataFromApi('/posts');

    expect(result).toEqual(testData);
  });
});
