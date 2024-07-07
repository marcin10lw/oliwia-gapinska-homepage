'use client';

import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

import { ADD_PROJECT_LANG_PARAM_NAME } from '../../_components/constants';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { RemoveProject } from './RemoveProject';
import { DashboardProject } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

export const ProjectDropdown = ({ project }: { project: DashboardProject }) => {
  const projectTranslations = project.translations;

  const getCreationDropdownItems = () => {
    if (projectTranslations.length === 1) {
      return projectTranslations[0].language.locale === 'pl' ? (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProjectTranslation.replace(':projectUid', String(project.uid))}?${ADD_PROJECT_LANG_PARAM_NAME}=en`}
          >
            Dodaj wersję EN
          </Link>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProjectTranslation.replace(':projectUid', project.uid)}?${ADD_PROJECT_LANG_PARAM_NAME}=pl`}
          >
            Dodaj wersję PL
          </Link>
        </DropdownMenuItem>
      );
    }
  };

  const getEditDropdownItems = () => {
    if (projectTranslations.length >= 1) {
      return projectTranslations.map((projectTranslation) => {
        return (
          <DropdownMenuItem key={projectTranslation.id} className="p-0">
            <Link
              className="px-2 py-1.5"
              href={`${FRONTEND_ROUTES.dashboardEditProject.replace(':projectUid', project.uid).replace(':projectLocale', projectTranslation.language.locale)}`}
            >
              Edytuj wersję <span className="uppercase">{projectTranslation.language.locale}</span>
            </Link>
          </DropdownMenuItem>
        );
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-6 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1" align="end">
        {getCreationDropdownItems()}
        {getEditDropdownItems()}
        <div>
          <RemoveProject projectId={project.id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
