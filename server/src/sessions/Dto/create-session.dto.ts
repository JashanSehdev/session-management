import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateSessionDto {
    @IsNumber()
    @IsNotEmpty()
    userId : number

    @IsOptional()
    payload: any

    @IsOptional()
    @IsBoolean()
    isActive ?: boolean

    @IsOptional()
    @IsBoolean()
    token ?: number | null
    
}