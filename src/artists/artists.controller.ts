import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @HttpCode(200)
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsService.remove(id);
  }
}
