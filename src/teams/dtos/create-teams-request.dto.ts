import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamsRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly call: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly businessNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly homepage?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly managerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly managerEmail: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly managerPhone?: string;

  @ApiProperty({ type: 'file', required: false })
  @IsOptional()
  readonly logoImage?: Express.Multer.File;

  @ApiProperty({ type: 'file', required: false })
  @IsOptional()
  readonly businessImage?: Express.Multer.File;
}
