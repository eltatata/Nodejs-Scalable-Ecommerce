import { v2 as cloudinary } from 'cloudinary';
import { envs } from '../../config';
import { ImageInfo, StoreDataSource } from '../../domain/';

export class StoreDataSourceImpl implements StoreDataSource {
  async upload(images: Buffer[]): Promise<ImageInfo[]> {
    const uploadImage = (image: Buffer): Promise<ImageInfo> => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: envs.CLOUDINARY_FOLDER }, (err, res) => {
            if (err) reject(err);
            else if (res) {
              resolve({
                secureUrl: res.secure_url,
                publicId: res.public_id,
              });
            } else reject(new Error('Upload failed, response is undefined'));
          })
          .end(image);
      });
    };
    return await Promise.all(images.map(uploadImage));
  }

  async delete(images: ImageInfo[]): Promise<void> {
    await cloudinary.api.delete_resources(
      images.map((image) => image.publicId),
    );
  }
}
