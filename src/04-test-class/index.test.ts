import {
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(56);
    expect(account.getBalance()).toBe(56);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(56);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account_01 = getBankAccount(56);
    const account_02 = getBankAccount(0);
    expect(() => account_01.transfer(100, account_02)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(56);
    expect(account.getBalance()).toBe(156);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(56);
    account.withdraw(56);
    expect(account.getBalance()).toBe(0);
  });

  test('should transfer money', () => {
    const account_01 = getBankAccount(56);
    const account_02 = getBankAccount(0);

    account_01.transfer(56, account_02);
    expect(account_01.getBalance()).toBe(0);
    expect(account_02.getBalance()).toBe(56);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(56);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(56);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(56);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
