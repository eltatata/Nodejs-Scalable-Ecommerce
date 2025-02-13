import { ImageInfo, StoreDataSource, StoreRepository } from '../../domain';

export class StoreRepositoryImpl implements StoreRepository {
  constructor(private readonly storeDataSource: StoreDataSource) {}

  upload(images: Buffer[]): Promise<ImageInfo[]> {
    return this.storeDataSource.upload(images);
  }

  delete(images: ImageInfo[]): Promise<void> {
    return this.storeDataSource.delete(images);
  }
}
