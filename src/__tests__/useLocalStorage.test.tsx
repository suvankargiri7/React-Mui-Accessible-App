import {
  renderHook,
  act,
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

describe('Test useLocalStorage', () => {
  const KEY = 'test-key';

  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return initialValue when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return the stored value from localStorage', () => {
    localStorage.setItem(KEY, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage when the value is updated', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('updated'));
  });

  it('should clear localStorage and reset to initialValue', () => {
    localStorage.setItem(KEY, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('initial');
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify('initial'));
  });

  it('should handle non-string initial value', () => {
    const { result } = renderHook(() => useLocalStorage(KEY, { a: 1 }));
    expect(result.current[0]).toEqual({ a: 1 });
  });

  it('should handle non-string value updates', () => {
    const { result } = renderHook(() =>
      useLocalStorage<Record<string, number>>(KEY, { a: 1 }),
    );

    act(() => {
      result.current[1]({ b: 2 });
    });

    expect(result.current[0]).toEqual({ b: 2 });
    expect(localStorage.getItem(KEY)).toBe(JSON.stringify({ b: 2 }));
  });

  it('should return initialValue when localStorage.getItem throws an error', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    getItemSpy.mockImplementation(() => {
      throw new Error('Test error');
    });

    const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));

    expect(result.current[0]).toBe('initial');

    getItemSpy.mockRestore();
  });
  it('should catch and log error when localStorage.setItem throws', () => {
    const TestComponent = () => {
      const [value, setValue] = useLocalStorage('test-key', 'initial');

      return (
        <div>
          <p data-testid="value">{value}</p>
          <button onClick={() => setValue('new-value')}>Update</button>
        </div>
      );
    };
    const setItemSpy = jest
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Mock setItem error');
      });

    render(<TestComponent />);

    fireEvent.click(screen.getByText('Update'));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error setting localStorage key'),
      expect.any(Error),
    );

    setItemSpy.mockRestore();
  });
  it('should catch and log error when localStorage.removeItem throws during clear', () => {
    const TestComponent = () => {
      const [value, clear] = useLocalStorage('test-key', 'initial');

      return (
        <div>
          <p data-testid="value">{value}</p>
          <button onClick={() => clear}>Clear</button>
        </div>
      );
    };

    const removeItemSpy = jest
      .spyOn(Storage.prototype, 'removeItem')
      .mockImplementation(() => {
        throw new Error('Mock removeItem error');
      });

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Clear'));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error clearing localStorage key'),
      expect.any(Error),
    );
    removeItemSpy.mockRestore();
  });
});
