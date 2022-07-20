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

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from 'src/favorites/entities/favorite.entity';

const MSG_COMPLETED = 'Completed successfully';
@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,

    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,

    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getByIndex(
    entyties:
      | Repository<Album>
      | Repository<Artist>
      | Repository<Track>
      | Repository<User>,
    id: string,
  ) {
    const entity = entyties.findOne({ where: { id } });
    if (!entity) {
      throw new HttpException(
        "Entity with this ID doesn't exist",
        HttpStatus.NOT_FOUND,
      );
    }
    return entity;
  }

  async getAlbums() {
    const entities = await this.albumRepository.find();
    return entities;
  }

  async getAlbum(id: string) {
    const entity = await this.getByIndex(this.albumRepository, id);
    return entity as Album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const entity = await this.albumRepository.create(createAlbumDto);
    return entity;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const entity = await this.getAlbum(id);
    Object.assign(entity, updateAlbumDto);
    this.albumRepository.save(entity);
    return entity;
  }

  async deleteAlbum(id: string) {
    const entity = await this.getAlbum(id);
    this.albumRepository.delete(entity.id);
  }

  async getArtists() {
    const entities = await this.artistRepository.find();
    return entities;
  }

  async getArtist(id: string) {
    const entity = await this.getByIndex(this.artistRepository, id);
    return entity as Artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
    const entity = await this.artistRepository.create(createArtistDto);
    return entity;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const entity = await this.getArtist(id);
    Object.assign(entity, updateArtistDto);
    this.artistRepository.save(entity);
    return entity;
  }

  async deleteArtist(id: string) {
    const entity = await this.getArtist(id);
    this.artistRepository.delete(entity.id);
  }

  getFavorites() {
    const response = new FavoritesRepsonse();
    // response.albums = global.favorites.albums.map(
    //   (id) => this.getByIndex(global.albums, id) as Album,
    // );
    // response.artists = global.favorites.artists.map(
    //   (id) => this.getByIndex(global.artists, id) as Artist,
    // );
    // response.tracks = global.favorites.tracks.map(
    //   (id) => this.getByIndex(global.tracks, id) as Track,
    // );
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

  async getTracks() {
    const users = await this.trackRepository.find();
    return users;
  }

  async getTrack(id: string) {
    const entity = await this.getByIndex(this.trackRepository, id);
    return entity as Track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const entity = await this.trackRepository.create(createTrackDto);
    return entity;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const entity = await this.getTrack(id);
    Object.assign(entity, updateTrackDto);
    this.trackRepository.save(entity);
    return entity;
  }

  async deleteTrack(id: string) {
    const entity = await this.getTrack(id);
    this.trackRepository.delete(entity.id);
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: string) {
    const entity = await this.getByIndex(this.userRepository, id);
    return entity as User;
  }

  async createUser(createUserDto: CreateUserDto) {
    const entity = await this.userRepository.create(createUserDto);
    return entity;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const entity = await this.getUser(id);
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
    this.userRepository.save(entity);
    return entity;
  }

  async deleteUser(id: string) {
    const entity = await this.getUser(id);
    this.userRepository.delete(entity.id);
  }
}
