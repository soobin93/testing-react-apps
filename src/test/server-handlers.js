import { rest } from 'msw';

const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;

const handlers = [
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (req, res, ctx) => {
      const requestParams = await req.json();

      if (!requestParams.password) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'password required'}),
        );
      }
      if (!requestParams.username) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'username required'}),
        );
      }
      return res(ctx.delay(delay), ctx.json({ username: requestParams.username }));
    },
  ),
];

export { handlers };
