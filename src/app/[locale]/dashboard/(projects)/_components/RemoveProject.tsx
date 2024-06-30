'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { removeProject } from './actions/removeProject.action';

export const RemoveProject = ({ projectId }: { projectId: number }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const onRemoveVideo = async () => {
    if (isRemoving) return;

    setIsRemoving(true);
    const res = await removeProject(projectId);

    if (res.ok) {
      setAlertOpen(false);
    } else {
      console.log('REMOVING PROJECT ERROR:', res.error);
    }

    setIsRemoving(false);
  };

  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="h-auto px-2 py-1.5">
          Remove project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-0">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemoving}>Anuluj</AlertDialogCancel>
          <Button variant="destructive" onClick={onRemoveVideo} isLoading={isRemoving} disabled={isRemoving}>
            Usuń projekt
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
