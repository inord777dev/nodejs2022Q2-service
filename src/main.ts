import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

const port = process.env.PORT || 4000;

global.albums = [];
global.artists = [];
global.favorites = {
  albums: [],
  artists: [],
  tracks: [],
};
global.tracks = [];
global.users = [];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
