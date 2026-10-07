import { IsNotEmpty, IsNumber } from "class-validator";


export class VerifyTokenDto {

    @IsNumber()
    @IsNotEmpty()
    token : number
}