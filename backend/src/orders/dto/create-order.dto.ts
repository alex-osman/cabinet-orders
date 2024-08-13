import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ConfigurationType } from './configuration-type.enum';

class CabinetDto {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  depth: number;

  @IsString()
  @IsNotEmpty()
  configurationType: ConfigurationType;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CabinetDto)
  cabinets: CabinetDto[];
}
