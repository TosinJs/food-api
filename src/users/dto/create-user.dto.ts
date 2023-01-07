import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(4, 25, {
        message: 'Username should be between 4 and 25 Characters long'
      })
    username: string;

    @IsAlphanumeric()
    @IsNotEmpty()
    @Length(6, 100, {
        message: 'Password should be at least 6 characters'
      })
    password: string;
}
