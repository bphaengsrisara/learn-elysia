import { Elysia } from 'elysia';
import { userRoutes } from './users';
import { postRoutes } from './posts';
import { commentRoutes } from './comments';

export const apiRoutes = new Elysia({ prefix: '/api' })
  .use(userRoutes)
  .use(postRoutes)
  .use(commentRoutes);
