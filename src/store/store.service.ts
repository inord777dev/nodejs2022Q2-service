import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { Album } from 'src/albums/entities/album.entity';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { Artist } from 'src/artists/entities/artist.entity';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { Track } from 'src/tracks/entities/track.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { FavoritesRepsonse } from 'src/favorites/dto/response-favorite.dto';

const MSG_COMPLETED = 'Completed successfully';
@Injectable()
export class StoreService {
  getIndex(entyties: Album[] | Artist[] | Track[] | User[], id: string) {
    const index = entyties.findIndex((x) => x.id === id);
    if (index < 0) {
      throw new HttpException(
        "Record with this ID doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return index;
  }

  getByIndex(entyties: Album[] | Artist[] | Track[] | User[], id: string) {
    return entyties[this.getIndex(entyties, id)];
  }

  getAlbums() {
    return global.albums;
  }

  getAlbum(id: string) {
    return this.getByIndex(global.albums, id);
  }

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const entity = new Album(createAlbumDto);
    global.albums.push(entity);
    return entity;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const entity = this.getByIndex(global.albums, id) as Album;
    Object.assign(entity, updateAlbumDto);
    return entity;
  }

  deleteAlbum(id: string) {
    global.tracks.forEach((x, i, arr) => {
      if (x.albumId === id) {
        arr[i].albumId = null;
      }
    });
    this.removeFavoritesByIndex(global.favorites.albums, id);
    global.albums.splice(this.getIndex(global.albums, id), 1);
  }

  getArtists() {
    return global.artists;
  }

  getArtist(id: string) {
    return this.getByIndex(global.artists, id);
  }

  createArtist(createArtistDto: CreateArtistDto) {
    const entity = new Artist(createArtistDto);
    global.artists.push(entity);
    return entity;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const entity = this.getByIndex(global.artists, id) as Artist;
    Object.assign(entity, updateArtistDto);
    return entity;
  }

  deleteArtist(id: string) {
    this.removeFavoritesByIndex(global.favorites.artists, id);
    global.albums.forEach((x, i, arr) => {
      if (x.artistId === id) {
        arr[i].artistId = null;
      }
    });
    global.tracks.forEach((x, i, arr) => {
      if (x.artistId === id) {
        arr[i].artistId = null;
      }
    });
    global.artists.splice(this.getIndex(global.artists, id), 1);
  }

  getFavorites() {
    const response = new FavoritesRepsonse();
    response.albums = global.favorites.albums.map(
      (id) => this.getByIndex(global.albums, id) as Album,
    );
    response.artists = global.favorites.artists.map(
      (id) => this.getByIndex(global.artists, id) as Artist,
    );
    response.tracks = global.favorites.tracks.map(
      (id) => this.getByIndex(global.tracks, id) as Track,
    );
    return response;
  }

  getFavoritesIndex(entyties: string[], id: string, useExeption = true) {
    const index = entyties.findIndex((x) => x === id);
    if (index < 0 && useExeption) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return index;
  }

  addFavoritesByIndex(
    favorites: string[],
    entyties: Album[] | Artist[] | Track[] | User[],
    id: string,
  ) {
    favorites.push(
      entyties[
        this.getFavoritesIndex(
          entyties.map((x) => x.id),
          id,
        )
      ].id,
    );
  }

  removeFavoritesByIndex(entyties: string[], id: string) {
    entyties.splice(this.getFavoritesIndex(entyties, id, false), 1);
  }

  addFavoritesAlbum(id: string) {
    this.addFavoritesByIndex(global.favorites.albums, global.albums, id);
    return MSG_COMPLETED;
  }

  addFavoritesArtist(id: string) {
    this.addFavoritesByIndex(global.favorites.artists, global.artists, id);
    return MSG_COMPLETED;
  }

  addFavoritesTrack(id: string) {
    this.addFavoritesByIndex(global.favorites.tracks, global.tracks, id);
    return MSG_COMPLETED;
  }

  removeFavoritesAlbum(id: string) {
    this.removeFavoritesByIndex(global.favorites.albums, id);
    return MSG_COMPLETED;
  }

  removeFavoritesArtist(id: string) {
    this.removeFavoritesByIndex(global.favorites.artists, id);
    return MSG_COMPLETED;
  }

  removeFavoritesTrack(id: string) {
    this.removeFavoritesByIndex(global.favorites.tracks, id);
    return MSG_COMPLETED;
  }

  getTracks() {
    return global.tracks;
  }

  getTrack(id: string) {
    return this.getByIndex(global.tracks, id);
  }

  createTrack(createTrackDto: CreateTrackDto) {
    const entity = new Track(createTrackDto);
    global.tracks.push(entity);
    return entity;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const entity = this.getByIndex(global.tracks, id) as Track;
    Object.assign(entity, updateTrackDto);
    return entity;
  }

  deleteTrack(id: string) {
    this.removeFavoritesByIndex(global.favorites.tracks, id);
    global.tracks.splice(this.getIndex(global.tracks, id), 1);
  }

  getUsers() {
    return global.users;
  }

  getUser(id: string) {
    return this.getByIndex(global.users, id);
  }

  createUser(createUserDto: CreateUserDto) {
    const entity = new User(createUserDto);
    global.users.push(entity);
    return entity;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const entity: User = this.getByIndex(global.users, id) as User;
    if (
      entity.password !== updateUserDto.oldPassword ||
      entity.password === updateUserDto.newPassword
    ) {
      throw new HttpException(
        'Wrong old or new password',
        HttpStatus.FORBIDDEN,
      );
    }
    entity.password = updateUserDto.newPassword;
    entity.version += 1;
    entity.updatedAt = Date.now();
    return entity;
  }

  deleteUser(id: string) {
    global.users.splice(this.getIndex(global.users, id), 1);
  }
}
