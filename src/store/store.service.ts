import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  async getByIndex(
    entyties:
      | Repository<Album>
      | Repository<Artist>
      | Repository<Track>
      | Repository<User>,
    id: string,
  ) {
    const entity = await entyties.findOne({ where: { id } });
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
    await this.albumRepository.save(entity);
    return entity;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const entity = await this.getAlbum(id);
    Object.assign(entity, updateAlbumDto);
    await this.albumRepository.save(entity);
    return entity;
  }

  async deleteAlbum(id: string) {
    const entity = await this.getAlbum(id);
    await this.albumRepository.delete(entity.id);
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
    await this.artistRepository.save(entity);
    return entity;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const entity = await this.getArtist(id);
    Object.assign(entity, updateArtistDto);
    await this.artistRepository.save(entity);
    return entity;
  }

  async deleteArtist(id: string) {
    const entity = await this.getArtist(id);
    await this.artistRepository.delete(entity.id);
  }

  async findFavorites() {
    const favorites = await this.favoriteRepository.find({
      relations: ['albums', 'artists', 'tracks'],
    });
    return favorites;
  }

  async findFavorite() {
    const favorites = await this.findFavorites();
    return favorites.length
      ? favorites[0]
      : await this.favoriteRepository.create({
          albums: [],
          artists: [],
          tracks: [],
        } as Favorite);
  }

  async getFavorites() {
    const favorites = await this.findFavorites();
    const response = new FavoritesRepsonse();
    if (favorites.length) {
      const favorite = favorites[0];
      response.albums = favorite.albums.map((x) => x as Album);
      response.artists = favorite.artists.map((x) => x as Artist);
      response.tracks = favorite.tracks.map((x) => x as Track);
    }
    return response;
  }

  async fineFavoriteEntityByIndex(
    entities: Repository<Album> | Repository<Artist> | Repository<Track>,
    id: string,
    useExeption = true,
  ) {
    const entity = await entities.findOne({ where: { id } });
    if (!entity && useExeption) {
      throw new HttpException('ID not found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return entity;
  }

  removeFavoriteByIndex(entities: Album[] | Artist[] | Track[], id: string) {
    const index = entities.findIndex((x) => x.id === id);
    if (index >= 0) {
      entities.splice(index, 1);
    }
  }

  async addFavorites(entity: Album | Artist | Track) {
    const favorite = await this.findFavorite();
    if (entity instanceof Album) {
      favorite.albums.push(entity);
    } else if (entity instanceof Artist) {
      favorite.artists.push(entity);
    } else if (entity instanceof Track) {
      favorite.tracks.push(entity);
    }
    await this.favoriteRepository.save(favorite);
  }

  async removeFavorites(entity: Album | Artist | Track) {
    const favorite = await this.findFavorite();
    if (entity instanceof Album) {
      this.removeFavoriteByIndex(favorite.albums, entity.id);
    } else if (entity instanceof Artist) {
      this.removeFavoriteByIndex(favorite.artists, entity.id);
    } else if (entity instanceof Track) {
      this.removeFavoriteByIndex(favorite.tracks, entity.id);
    }
    await this.favoriteRepository.save(favorite);
  }

  async addFavoritesAlbum(id: string) {
    await this.addFavorites(
      await this.fineFavoriteEntityByIndex(this.albumRepository, id),
    );
    return MSG_COMPLETED;
  }

  async addFavoritesArtist(id: string) {
    await this.addFavorites(
      await this.fineFavoriteEntityByIndex(this.artistRepository, id),
    );
    return MSG_COMPLETED;
  }

  async addFavoritesTrack(id: string) {
    await this.addFavorites(
      await this.fineFavoriteEntityByIndex(this.trackRepository, id),
    );
    return MSG_COMPLETED;
  }

  async removeFavoritesAlbum(id: string) {
    await this.removeFavorites(
      await this.fineFavoriteEntityByIndex(this.albumRepository, id),
    );
    return MSG_COMPLETED;
  }

  async removeFavoritesArtist(id: string) {
    await this.removeFavorites(
      await this.fineFavoriteEntityByIndex(this.artistRepository, id),
    );
    return MSG_COMPLETED;
  }

  async removeFavoritesTrack(id: string) {
    await this.removeFavorites(
      await this.fineFavoriteEntityByIndex(this.trackRepository, id),
    );
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
    await this.trackRepository.save(entity);
    return entity;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const entity = await this.getTrack(id);
    Object.assign(entity, updateTrackDto);
    await this.trackRepository.save(entity);
    return entity;
  }

  async deleteTrack(id: string) {
    const entity = await this.getTrack(id);
    await this.trackRepository.delete(entity.id);
  }

  async getUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: string) {
    const entity = await this.getByIndex(this.userRepository, id);
    return entity as User;
  }

  async getUserByLogin(login: string) {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async validate(login: string, password: string) {
    const user = await this.getUserByLogin(login);
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const entity = await this.userRepository.create(createUserDto);
    await this.userRepository.save(entity);
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
    await this.userRepository.save(entity);
    return entity;
  }

  async deleteUser(id: string) {
    const entity = await this.getUser(id);
    await this.userRepository.delete(entity.id);
  }
}
