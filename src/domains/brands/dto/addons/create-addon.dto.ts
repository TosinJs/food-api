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
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description: string;
}
