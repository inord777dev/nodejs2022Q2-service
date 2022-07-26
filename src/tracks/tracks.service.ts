import { Injectable } from '@nestjs/common';
import { StoreService } from 'src/store/store.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly storeService: StoreService) {}

  findAll() {
    return this.storeService.getTracks();
  }

  findOne(id: string) {
    return this.storeService.getTrack(id);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.storeService.createTrack(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.storeService.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.storeService.deleteTrack(id);
  }
}
