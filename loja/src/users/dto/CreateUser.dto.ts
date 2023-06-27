import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailIsUnique } from "../validators/email-is-unique.validator";

export class CreateUserDTO{

    @IsNotEmpty({ message: 'Nome não pode ser vázio' })
    Nome: string;

    @IsEmail(undefined, { message: 'E-mail informado inválido' })
    @EmailIsUnique( {message: 'E-mail já cadastrado'} )
    Email: string;

    @MinLength(6, { message: 'Senha deve conter no mínimo 6 caracteres' })
    Senha: string;
}