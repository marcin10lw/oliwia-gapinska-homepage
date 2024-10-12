import { getDashboardProjects } from './utils';

export type DashboardProject = NonNullable<Awaited<ReturnType<typeof getDashboardProjects>>>[number];
