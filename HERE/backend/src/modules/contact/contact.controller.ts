import {
  ArgumentsHost,
  BadRequestException,
  Body,
  Catch,
  Controller,
  ExceptionFilter,
  HttpException,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage, MulterError } from 'multer';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

const ALLOWED_ATTACHMENT_TYPES = /\.(pdf|doc|docx|jpg|jpeg|png|gif|txt|xls|xlsx|ppt|pptx)$/i;

// Multer errors (e.g. file-too-large) are thrown inside the FileInterceptor,
// before the route handler's own try/catch ever runs — this filter catches
// them at the Nest level so the client still gets a clean 400 instead of a
// generic 500.
@Catch(MulterError)
class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const message =
      exception.code === 'LIMIT_FILE_SIZE'
        ? 'File is too large. Maximum size is 10 MB.'
        : exception.message;
    response.status(400).json({ statusCode: 400, message });
  }
}

// No auth guard — the contact form is fully public
@Controller('contact')
@UseFilters(MulterExceptionFilter)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_req, file, callback) => {
        if (ALLOWED_ATTACHMENT_TYPES.test(file.originalname)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'File type not allowed. Accepted: PDF, Word, Excel, PowerPoint, images, text.',
            ),
            false,
          );
        }
      },
    }),
  )
  async send(
    @Body() dto: CreateContactDto,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    try {
      return await this.contactService.send(dto, file);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
