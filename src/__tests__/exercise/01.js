// simple test with ReactDOM
// http://localhost:3000/counter

import React from 'react';
import { act } from 'react-dom/test-utils';
import { createRoot } from 'react-dom/client';
import Counter from '../../components/counter';

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true;

beforeEach(() => {
  document.body.innerHTML = '';
});

test('counter increments and decrements when the buttons are clicked', () => {
  // generate root element
  const rootDiv = document.createElement('div');
  document.body.append(rootDiv);

  // render React components
  act(() => {
    createRoot(rootDiv).render(<Counter />)
  });

  const [decrement, increment] = rootDiv.querySelectorAll('button');
  const messageDiv = rootDiv.firstChild.querySelector('div');

  expect(messageDiv.textContent).toBe('Current count: 0');

  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  })

  // test increment button click
  act(() => increment.dispatchEvent(clickEvent));
  expect(messageDiv.textContent).toBe('Current count: 1');

  // test decrement button click
  act(() => decrement.dispatchEvent(clickEvent));
  expect(messageDiv.textContent).toBe('Current count: 0');
});

/* eslint no-unused-vars:0 */
