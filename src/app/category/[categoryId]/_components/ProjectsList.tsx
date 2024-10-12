import Link from 'next/link';

import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import Image from 'next/image';
import { MediaTable, ProjectTable } from '@/db/schema';

interface ProjectsListProps {
  projects: (typeof ProjectTable.$inferSelect & { projectImage?: typeof MediaTable.$inferSelect })[];
}

export const ProjectsList = async ({ projects }: ProjectsListProps) => {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {projects.map((project) => {
        const projectPreviewImage = project.projectImage?.publicUrl;
        return (
          <li key={project.id}>
            <Link
              href={FRONTEND_ROUTES.project.replace(':projectId', project.projectId)}
              className="group relative flex aspect-square items-end bg-neutral-200"
            >
              {projectPreviewImage && (
                <Image
                  width={400}
                  height={400}
                  src={projectPreviewImage}
                  alt={project.title}
                  className="absolute h-full w-full object-cover"
                />
              )}
              <div className="z-[1] flex h-full w-full items-end bg-gradient-to-b from-transparent to-neutral-500 p-5">
                <div>
                  <h2 className="mb-0 text-2xl font-semibold text-white">{project.title}</h2>
                  <dl className="flex items-center gap-1.5 text-sm capitalize text-white">
                    <dt>Medium:</dt>
                    <dd>{project.medium}</dd>
                  </dl>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
