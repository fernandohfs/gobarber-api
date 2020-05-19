import { Router } from 'express';
import { CREATED, BAD_REQUEST } from 'http-status';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await CreateUserService.execute({ name, email, password });

    return response.status(CREATED).json(user);
  } catch (err) {
    return response.status(BAD_REQUEST).json({ error: err.message });
  }
});

export default usersRouter;
