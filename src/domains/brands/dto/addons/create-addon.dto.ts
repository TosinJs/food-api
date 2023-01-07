import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddonDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    @IsOptional()
    category: string;

    @IsString()
    @IsOptional()
    description: string;
}