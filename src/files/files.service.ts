import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './dto/file-element.response';
import { format } from 'date-fns';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { MFile } from './mfile.class';
import sharp from 'sharp';

@Injectable()
export class FilesService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;
    const res: FileElementResponse[] = [];

    await ensureDir(uploadFolder);

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
      res.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }

    return res;
  }

  convertToWebP(file: Buffer) {
    return sharp(file).webp().toBuffer();
  }
}
