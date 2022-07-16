import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
@Injectable()
export class AlbumsService {
  constructor(private readonly storeService: StoreService) {}

  findAll() {
    return this.storeService.getAlbums();
  }

  findOne(id: string) {
    return this.storeService.getAlbum(id);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.storeService.createAlbum(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.storeService.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.storeService.deleteAlbum(id);
  }
}
