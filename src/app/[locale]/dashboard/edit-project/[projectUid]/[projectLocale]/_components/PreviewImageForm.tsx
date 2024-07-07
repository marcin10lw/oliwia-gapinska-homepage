'use client';

import { ImagePreviewCropper } from '@/components/ImagePreviewCropper';
import { LabeledFileUploader } from '@/components/LabeledFileUploader';

export const PreviewImageForm = () => {
  return (
    <form>
      <LabeledFileUploader
        label="Zdjęcie podglądowe"
        name="preview-image"
        value={values.previewImage ? [values.previewImage] : null}
        onChange={(files) => setFieldValue('previewImage', files[0])}
        error={errors.previewImage && touched.previewImage ? errors.previewImage : undefined}
        mode="single"
        renderPreview={(preview, _, onPreviewFileDelete, onUpdateFile) => {
          return (
            preview &&
            preview.length > 0 && (
              <div
                className="flex flex-wrap items-start justify-center gap-5"
                onClick={(event) => event.stopPropagation()}
              >
                {preview.map((item) => (
                  <ImagePreviewCropper
                    key={item.name}
                    file={item}
                    onPreviewFileDelete={onPreviewFileDelete}
                    onSaveCroppedImage={onUpdateFile}
                    modal={{
                      title: 'Przytnij zdjęcie',
                      description: 'Dostosuj zdjęcie do swoich wymagań',
                      buttonText: 'Przytnij',
                    }}
                  />
                ))}
              </div>
            )
          );
        }}
      />
    </form>
  );
};
