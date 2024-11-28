import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';
import { ExhibitCreateDto } from './dto/exhibit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Exhibit } from './Exhibit.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class ExhibitService {
  constructor(
    @InjectRepository(Exhibit) private readonly exhibitRepository: Repository<Exhibit>,
    private readonly configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'dagwbns8i',
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY') || '858431552284377',
      api_secret:
        this.configService.get<string>('CLOUDINARY_API_SECRET') || 'Veel4FSz-CVolS-1-kjhEv1Gv68',
    });
  }

  /**
   * Retrieves a paginated list of exhibits based on the provided query parameters.
   *
   * @param {ExhibitQueryDto} exhibitQuery - The query parameters for fetching exhibits.
   * @param {number} exhibitQuery.limit - The number of exhibits to retrieve per page.
   * @param {number} exhibitQuery.page - The page number to retrieve.
   * @returns {Promise<{ data: Array<Exhibit>, total: number }>} A promise that resolves to an object containing the list of exhibits and the total count.
   */
  async getExhibits(
    exhibitQuery: ExhibitQueryDto,
  ): Promise<{ data: Array<Exhibit>; total: number }> {
    const { limit, page } = exhibitQuery;
    const [data, total] = await this.exhibitRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  /**
   * Uploads an image buffer to Cloudinary after resizing and formatting it.
   *
   * @param fileBuffer - The buffer of the image file to be uploaded.
   * @param fileName - The name of the image file.
   * @param id - The unique identifier associated with the image.
   * @returns {Promise<UploadApiResponse>} A promise that resolves to the Cloudinary upload response.
   *
   * @throws Will throw an error if the upload to Cloudinary fails.
   */

  async uploadImageBuffer(
    fileBuffer: Buffer,
    fileName: string,
    id: number,
  ): Promise<UploadApiResponse> {
    const uniqueFilename = `${uuidv4()}/${id}/${fileName.split('.')[0]}`;

    const updatedBuffer = await sharp(fileBuffer)
      .resize({
        height: 800,
        width: 800,
        fit: 'cover',
      })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toBuffer();

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'image', folder: 'exhibits', public_id: uniqueFilename },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(updatedBuffer);
    });
  }

  /**
   * Creates a new exhibit.
   *
   * @param {ExhibitCreateDto} data - The data to create the exhibit with.
   * @returns {Promise<Exhibit | null>} The created exhibit.
   */
  async createExhibit(data: ExhibitCreateDto): Promise<Exhibit | null> {
    const exhibit = this.exhibitRepository.create({ ...data });
    await this.exhibitRepository.save(exhibit);

    return exhibit;
  }

  /**
   * Retrieves an exhibit by its ID.
   *
   * @param {number} id - The ID of the exhibit to retrieve.
   * @returns {Promise<Exhibit | null>} A promise that resolves to the exhibit if found, or null if not found.
   */
  async getExhibitById(id: number): Promise<Exhibit | null> {
    return await this.exhibitRepository.findOne({ where: { id } });
  }

  /**
   * Retrieves a paginated list of exhibits for a specific user.
   *
   * @param exhibitQuery - An object containing pagination parameters.
   * @param exhibitQuery.limit - The number of exhibits to retrieve per page.
   * @param exhibitQuery.page - The current page number.
   * @param userID - The ID of the user whose exhibits are to be retrieved.
   * @returns {Promise<{ data: Array<Exhibit>; total: number }>} A promise that resolves to an object containing the following properties:
   * - `data`: An array of exhibits belonging to the specified user.
   * - `total`: The total number of exhibits for the specified user.
   */
  async getExhibitByUserId(
    exhibitQuery: ExhibitQueryDto,
    userID: number,
  ): Promise<{ data: Array<Exhibit>; total: number }> {
    const { limit, page } = exhibitQuery;

    const [data, total] = await this.exhibitRepository.findAndCount({
      where: { userID },
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  /**
   * Deletes an exhibit by its ID.
   *
   * This method first attempts to delete the exhibit's image from Cloudinary.
   * If the image deletion fails, an InternalServerErrorException is thrown.
   * If the image deletion is successful, the exhibit is then removed from the repository.
   *
   * @param exhibit - The exhibit to be deleted.
   * @throws {InternalServerErrorException} If the image deletion from Cloudinary fails.
   * @returns {Promise<void>} A promise that resolves when the exhibit is successfully deleted.
   */
  async deleteExhibitById(exhibit: Exhibit): Promise<void> {
    const cloudPhotoDelete = await cloudinary.uploader.destroy(exhibit.imagePublicId);
    if (cloudPhotoDelete['result'] !== 'ok')
      throw new InternalServerErrorException('Failed to delete image from Cloudinary'); //? need drop error message

    await this.exhibitRepository.remove(exhibit);
  }
}
