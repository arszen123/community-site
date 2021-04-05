import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PasswordService } from '@app/shared/services/password/password.service';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true, index: { unique: true }, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  comparePassword(password: string): boolean {
    return new PasswordService().validate(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

export const UserDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};

UserSchema.pre('save', function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = new PasswordService().hash(user.password);
  next();
});
