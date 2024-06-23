'use client';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { EditorPreview } from './EditorPreview';
import { Label } from '@/components/ui/label';
import './editorStyle.css';

interface DescriptionEditorProps {
  label: string;
  triggerLabel: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const Editor = ({ triggerLabel, label, value, onChange, error }: DescriptionEditorProps) => {
  return (
    <div>
      <div className="mb-2.5 ml-[1px] flex items-center justify-between gap-10">
        <Label htmlFor="description" className="text-xs uppercase">
          {label}
        </Label>
        <EditorPreview
          triggerLabel={triggerLabel}
          content={value}
          triggerBtnProps={{
            variant: 'outline',
            size: 'sm',
          }}
        />
      </div>
      <ReactQuill
        id="description"
        theme="snow"
        value={value}
        onChange={onChange}
        className={!!error ? 'quill quill-error' : 'quill'}
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: false }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
        ]}
      />
      {!!error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
};
