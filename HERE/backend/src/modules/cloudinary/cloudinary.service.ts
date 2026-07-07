import { Injectable, InternalServerErrorException } from '@nestjs/common';
import type { UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';
import { cloudinary, configureCloudinary, isCloudinaryConfigured } from './cloudinary.config';

@Injectable()
export class CloudinaryService {
  private configured = false;

  private ensureConfigured() {
    if (!isCloudinaryConfigured()) {
      throw new InternalServerErrorException(
        'Cloudinary is not configured: set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, ' +
          'CLOUDINARY_API_SECRET in backend/.env',
      );
    }
    if (!this.configured) {
      configureCloudinary();
      this.configured = true;
    }
  }

  async uploadImageFromBuffer(buffer: Buffer, folder: string): Promise<UploadApiResponse> {
    this.ensureConfigured();
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(new InternalServerErrorException(`Cloudinary upload failed: ${error?.message}`));
            return;
          }
          resolve(result);
        },
      );
      streamifier.createReadStream(buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    if (!isCloudinaryConfigured()) return;
    try {
      this.ensureConfigured();
      await cloudinary.uploader.destroy(publicId);
    } catch (error: any) {
      // Best-effort cleanup — a failed remote delete shouldn't block removing the DB row.
      console.error(`Cloudinary destroy failed for ${publicId}: ${error.message}`);
    }
  }
}
