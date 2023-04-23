// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import useCounter from '../../components/use-counter';

describe('useCounter custom hook', () => {
  it('exposes the count and increment/decrement functions', () => {
    const { result } = renderHook(useCounter);

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it('allows customization of the initial count', () => {
    const { result } = renderHook(useCounter, { initialProps: { initialCount: 5 } });

    expect(result.current.count).toBe(5);

    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(5);
  });

  it('allows customization of step', () => {
    const { result } = renderHook(useCounter, { initialProps: { step: 2 } });

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(2);
    act(() => result.current.decrement());
    expect(result.current.count).toBe(0);
  });

  it('allows the step to be changed', () => {
    const { result, rerender } = renderHook(useCounter, { initialProps: { step: 2 } });

    expect(result.current.count).toBe(0);

    act(() => result.current.increment());
    expect(result.current.count).toBe(2);

    rerender({ step: 1 });
    act(() => result.current.decrement());
    expect(result.current.count).toBe(1);
  });
});

/* eslint no-unused-vars:0 */
