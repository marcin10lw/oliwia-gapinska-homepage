import { v4 } from 'uuid';
import { supa } from './supabase';

const imagesBucketName = process.env.SUPABASE_IMAGES_BUCKET_NAME;
const videosBucketName = process.env.SUPABASE_VIDEOS_BUCKET_NAME;

type BucketType = 'images' | 'videos';

export const getPublicUrlOfFile = async (file: File, filePath: string, bucketType: BucketType = 'images') => {
  if (!file) return null;

  const path = `${filePath}/${v4()}${file.name}`;

  const { data: dat, error } = await supa.storage
    .from(bucketType === 'images' ? imagesBucketName! : videosBucketName!)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.log('UPLOAD ERROR:', error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supa.storage.from(bucketType === 'images' ? imagesBucketName! : videosBucketName!).getPublicUrl(`${dat?.path}`);

  return { publicUrl, path: dat.path };
};

export const removePublicFile = async (fileId: string, bucketType: BucketType = 'images') =>
  supa.storage.from(bucketType === 'images' ? imagesBucketName! : videosBucketName!).remove([fileId]);
