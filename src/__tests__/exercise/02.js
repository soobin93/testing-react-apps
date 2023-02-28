// simple test with React Testing Library
// http://localhost:3000/counter

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Counter from '../../components/counter';

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />);

  const [decrement, increment] = container.querySelectorAll('button');
  const message = container.firstChild.querySelector('div');

  // check initial count value
  expect(message).toHaveTextContent('Current count: 0');

  // check the count value after when the increment button is clicked
  fireEvent.click(increment);
  expect(message).toHaveTextContent('Current count: 1');

  // check the count value after when the decrement button is clicked
  fireEvent.click(decrement);
  expect(message).toHaveTextContent('Current count: 0');
});
