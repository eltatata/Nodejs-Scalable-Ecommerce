import { ImageInfo, StoreDataSource, StoreRepository } from '../../domain';

export class StoreRepositoryImpl implements StoreRepository {
  constructor(private readonly storeDataSource: StoreDataSource) {}

  async upload(images: Buffer[]): Promise<ImageInfo[]> {
    return await this.storeDataSource.upload(images);
  }

  async delete(images: ImageInfo[]): Promise<void> {
    return await this.storeDataSource.delete(images);
  }
}
