import { IsString, IsNumber, ValidateIf, IsUUID } from 'class-validator';
export class CreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((_, v) => v != null)
  @IsUUID('4')
  artistId: string | null; // refers to Artist

  @ValidateIf((_, v) => v != null)
  @IsUUID('4')
  albumId: string | null; // refers to Album

  @IsNumber()
  duration: number; // integer number
}
