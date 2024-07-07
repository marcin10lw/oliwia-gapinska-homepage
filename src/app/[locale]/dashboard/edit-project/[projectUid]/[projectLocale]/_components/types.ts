import { getToEditProject } from './actions/getToEditProject.action';

export type EditedProjectBasicInformation = NonNullable<Awaited<ReturnType<typeof getToEditProject>>>;
