import { getExistingProject } from './utils';

export type ExistingProject = NonNullable<Awaited<ReturnType<typeof getExistingProject>>>;
