'use client';

import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';

import { ADD_PROJECT_LANG_PARAM_NAME, PROJECT_ID_PARAM_NAME } from '../../_components/constants';
import { FRONTEND_ROUTES } from '@/lib/navigation/routes.frontend';
import { RemoveProject } from './RemoveProject';
import { DashboardProject } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ProjectDropdown = ({ project }: { project: DashboardProject }) => {
  const projectTranslations = project.translations;

  const getDropdownItems = () => {
    if (projectTranslations.length === 1) {
      return projectTranslations[0].language.locale === 'pl' ? (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProject}?${ADD_PROJECT_LANG_PARAM_NAME}=en&${PROJECT_ID_PARAM_NAME}=${project.id}`}
          >
            Dodaj wersję EN
          </Link>
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem className="p-0">
          <Link
            className="px-2 py-1.5"
            href={`${FRONTEND_ROUTES.dashboardAddProject}?${ADD_PROJECT_LANG_PARAM_NAME}=pl&${PROJECT_ID_PARAM_NAME}=${project.id}`}
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
      <DropdownMenuContent align="end">
        {/* {getDropdownItems()} */}
        <div className="mt-1">
          <RemoveProject projectId={project.id} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
