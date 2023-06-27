import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.modulo';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
