import { HttpCode, Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly storeService: StoreService) {}

  @HttpCode(200)
  findAll() {
    return this.storeService.getArtists();
  }

  findOne(id: string) {
    return this.storeService.getArtist(id);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.storeService.createArtist(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.storeService.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    return this.storeService.deleteArtist(id);
  }
}
