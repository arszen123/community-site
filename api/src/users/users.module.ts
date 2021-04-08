import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { UserDefinition } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { CommentUserResolver, UsersResolver } from './resolvers/users.resolver';

@Module({
  imports: [MongooseModule.forFeature([UserDefinition]), SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, CommentUserResolver],
  exports: [UsersService],
})
export class UsersModule {}
