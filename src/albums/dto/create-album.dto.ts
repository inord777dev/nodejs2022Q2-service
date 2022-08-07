import { IsString, IsNumber, ValidateIf, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((_, v) => v != null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist
}
