import { ImageInfo } from '../';

export abstract class StoreRepository {
  abstract upload(images: Buffer[]): Promise<ImageInfo[]>;
  abstract delete(images: ImageInfo[]): Promise<void>;
}
