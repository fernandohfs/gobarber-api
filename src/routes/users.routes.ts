import { Router } from 'express';
import { CREATED, BAD_REQUEST } from 'http-status';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const user = await CreateUserService.execute({ name, email, password });

    return response.status(CREATED).json(user);
  } catch (err) {
    return response.status(BAD_REQUEST).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const user = await UpdateUserAvatarService.execute({
        userId: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(user);
    } catch (err) {
      return response.status(BAD_REQUEST).json({ error: err.message });
    }
  },
);

export default usersRouter;
