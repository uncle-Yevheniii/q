import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ExhibitQueryDto } from './dto/exhibitQuery.dto';
import { ExhibitCreateDto } from './dto/exhibit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
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

  async getExhibits(exhibitQuery: ExhibitQueryDto) {
    const { limit = 5, page = 1 } = exhibitQuery;
    const [data, total] = await this.exhibitRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async uploadImageBuffer(fileBuffer: Buffer, fileName: string): Promise<UploadApiResponse> {
    const uniqueFilename = `${uuidv4()}/${fileName}`;

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

  async createExhibit(data: ExhibitCreateDto) {
    const exhibit = this.exhibitRepository.create({ ...data });
    await this.exhibitRepository.save(exhibit);

    return exhibit;
  }

  async getExhibitById(id: number) {
    return await this.exhibitRepository.findOne({ where: { id } });
  }
}
