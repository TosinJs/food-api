import { IsAlphanumeric, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

    @IsString({ })
    @Length(4, 25, {
        message: "Username should be between 4 and 25 Characters long"
      })
    username: string;

    @IsAlphanumeric()
    @Length(6, 100, {
        message: "Username should be at least 6 characters"
      })
    password: string;
}
