import routes from './routes.json';
import { pages } from './generated-pages';

export { pages };
export const genericRoutes = routes as string[];
export type { PageContent } from './types';
