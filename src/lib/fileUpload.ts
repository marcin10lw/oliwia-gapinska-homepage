import { v4 } from 'uuid';
import { supa } from './supabase';

const bucketName = process.env.SUPABASE_BUCKET_NAME;

export const getPublicUrlOfFile = async (file: File, filePath: string) => {
  if (!file) return null;

  const path = `${filePath}/${v4()}${file.name}`;

  const { data: dat, error } = await supa.storage.from(bucketName!).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.log('UPLOAD ERROR:', error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supa.storage.from(bucketName!).getPublicUrl(`${dat?.path}`);

  return { publicUrl, path: dat.path };
};

export const removePublicFile = async (fileId: string) => supa.storage.from(bucketName!).remove([fileId]);
