import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePedidoDto {

    @IsString()
    @IsNotEmpty()
    producto: string;

    @IsNumber()
    @IsNotEmpty()
    cantidad: number;

    @IsString()
    @IsNotEmpty()
    tipoPago: 'credito' | 'debito' | 'efectivo' | 'Transferencia';
}