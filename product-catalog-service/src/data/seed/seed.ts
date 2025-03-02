import { envs } from '../../config';
import { Product } from '../mongo/models/product.model';
import { Category } from '../mongo/models/category.model';
import { MongoDatabase } from '../mongo/database';
import { v2 as cloudinary } from 'cloudinary';
import { seedData } from './data';
import path from 'path';

cloudinary.config({
  cloud_name: envs.CLOUD_NAME,
  api_key: envs.CLOUDINARY_API_KEY,
  api_secret: envs.CLOUDINARY_API_SECRET,
});

(async () => {
  try {
    await MongoDatabase.connect(envs.MONGO_URI);
    await main();
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await MongoDatabase.disconnect();
  }
})();

async function main() {
  try {
    await Promise.all([Product.deleteMany({}), Category.deleteMany({})]);
    console.log('Data cleared');

    const insertedCategories = await Category.insertMany(seedData.categories);
    console.log('Categories seeded');

    const categoryMap = insertedCategories.reduce(
      (map: { [key: string]: string }, category) => {
        map[category.name] = category._id.toString();
        return map;
      },
      {},
    );

    const productsWithCategoryIds = await Promise.all(
      seedData.products.map(async (product) => {
        try {
          const uploadedImages = await Promise.all(
            product.images.map(async (imagePath) => {
              const absoluteImagePath = path.resolve(__dirname, imagePath);
              const uploadResult = await cloudinary.uploader.upload(
                absoluteImagePath,
                {
                  folder: envs.CLOUDINARY_FOLDER,
                },
              );
              return {
                secureUrl: uploadResult.secure_url,
                publicId: uploadResult.public_id,
              };
            }),
          );
          return {
            ...product,
            category: categoryMap[product.category],
            images: uploadedImages,
          };
        } catch (error) {
          console.error(
            `Error uploading images for product ${product.name}:`,
            error,
          );
          throw error;
        }
      }),
    );

    await Product.insertMany(productsWithCategoryIds);
    console.log('Products seeded');
  } catch (error) {
    console.error('Error in main function:', error);
    throw error;
  }

  console.log('Seed complete');
}
