'use client';

import DOMPurify from 'dompurify';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EditorPreviewProps {
  triggerLabel: string;
  content: string;
  triggerBtnProps?: ButtonProps;
}

export const EditorPreview = ({ triggerLabel, content, triggerBtnProps }: EditorPreviewProps) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...triggerBtnProps}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="block h-screen w-full max-w-[71.25rem] px-0">
        <DialogHeader className="mb-8 px-8">
          <DialogTitle className="m-0">{triggerLabel}</DialogTitle>
        </DialogHeader>
        <div className="h-full pb-8">
          <ScrollArea className="h-full px-8">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
