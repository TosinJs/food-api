import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";

export class CreateBrandDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
