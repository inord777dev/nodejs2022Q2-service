import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly storeService: StoreService) {}

  getAll() {
    return this.storeService.getFavorites();
  }

  addAlbum(id: string) {
    return this.storeService.addFavoritesAlbum(id);
  }

  removeAlbum(id: string) {
    return this.storeService.removeFavoritesAlbum(id);
  }

  addArtist(id: string) {
    return this.storeService.addFavoritesArtist(id);
  }

  removeArtist(id: string) {
    return this.storeService.removeFavoritesArtist(id);
  }

  addTrack(id: string) {
    return this.storeService.addFavoritesTrack(id);
  }

  removeTrack(id: string) {
    return this.storeService.removeFavoritesTrack(id);
  }
}
