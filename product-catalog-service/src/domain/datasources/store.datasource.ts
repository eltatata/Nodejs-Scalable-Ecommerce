import { ImageInfo } from '../';

export abstract class StoreDataSource {
  abstract upload(images: Buffer[]): Promise<ImageInfo[]>;
  abstract delete(images: ImageInfo[]): Promise<void>;
}
