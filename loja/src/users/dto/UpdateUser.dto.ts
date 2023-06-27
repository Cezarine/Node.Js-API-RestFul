import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailIsUnique } from "../validators/email-is-unique.validator";

export class UpdateUserDTO{

    @IsNotEmpty({ message: 'Nome não pode ser vázio' })
    @IsOptional()
    Nome: string;

    @IsEmail(undefined, { message: 'E-mail informado inválido' })
    @EmailIsUnique( {message: 'E-mail já cadastrado'} )
    @IsOptional()
    Email: string;

    @MinLength(6, { message: 'Senha deve conter no mínimo 6 caracteres' })
    @IsOptional()
    Senha: string;
}