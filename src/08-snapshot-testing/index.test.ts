import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const result = generateLinkedList([1, 2, 3]);
    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(['2', '3', '4']);

    expect(result).toMatchSnapshot();
  });
});
