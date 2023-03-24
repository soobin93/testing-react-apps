// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { build, perBuild } from '@jackfranklin/test-data-bot';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from 'test/server-handlers';

import Login from '../../components/login-submission';

const buildLoginForm = build({
  fields: {
    username: perBuild(() => faker.internet.userName()),
    password: perBuild(() => faker.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i))

  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`omitting the username results in an error`, async () => {
  render(<Login />)
  const { password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/password/i), password)

  await userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i))

  expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
    <div
      role="alert"
      style="color: red;"
    >
      username required
    </div>
  `)
});

test(`unknown server error displays the error message`, async () => {
  const errorMessage = 'something is wrong';

  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) =>
        res(ctx.status(500), ctx.json({ message: errorMessage })),
    ),
  );

  render(<Login />);

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading.../i));

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
});
