'use client';

import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { ADD_PROJECT_LANG_PARAM_NAME } from '../../_components/constants';
import { RemoveProject } from './RemoveProject';
import { DashboardProject } from './types';

export const ProjectDropdown = ({ project }: { project: DashboardProject }) => {
  const projectTranslations = project.translations;

  const getDropdownItems = () => {
    if (projectTranslations.length === 1) {
      return projectTranslations[0].language.locale === 'pl' ? (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProjectTranslation.replace(':projectId', String(project.id))}?${ADD_PROJECT_LANG_PARAM_NAME}=en`}
          >
            Dodaj wersję EN
          </Link>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProjectTranslation.replace(':projectId', String(project.id))}?${ADD_PROJECT_LANG_PARAM_NAME}=pl`}
          >
            Dodaj wersję PL
          </Link>
        </DropdownMenuItem>
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical className="size-6 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1" align="end">
        {getDropdownItems()}
        <div>
          <RemoveProject projectId={project.id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
