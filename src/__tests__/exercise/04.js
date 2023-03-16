// form testing
// http://localhost:3000/login

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { build, perBuild } from '@jackfranklin/test-data-bot';
import Login from '../../components/login';

const loginFormBuilder = build({
  fields: {
    username: perBuild(() => faker.internet.userName()),
    password: perBuild(() => faker.internet.password())
  }
});

const buildLoginForm = (overrides) => ({
  ...loginFormBuilder.one(),
  ...overrides
});

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn();

  render(<Login onSubmit={handleSubmit} />);

  const userNameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  const { username, password } = buildLoginForm({ password: 'abc' });

  await userEvent.type(userNameInput, username);
  await userEvent.type(passwordInput, password);

  const submitButton = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password
  });

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

/*
eslint
  no-unused-vars: "off",
*/
