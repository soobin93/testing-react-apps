// Avoid implementation details
// http://localhost:3000/counter

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />);

  const messageDiv = screen.getByText(/current count/i);
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  const decrementButton = screen.getByRole('button', { name: /decrement/i });

  expect(messageDiv).toHaveTextContent('Current count: 0');
  await userEvent.click(incrementButton);
  expect(messageDiv).toHaveTextContent('Current count: 1');
  await userEvent.click(decrementButton);
  expect(messageDiv).toHaveTextContent('Current count: 0');
})
