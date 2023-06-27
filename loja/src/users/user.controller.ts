import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUsersDTO } from "./dto/listUsers.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Controller('/usuarios')
export class UserController{
    constructor(private userRepository: UserRepository) {}

    @Post()
    async CreateUsers(@Body() dadosDoUsuario: CreateUserDTO){
        const userEntity = new UserEntity();
        userEntity.Id = uuid();
        userEntity.Nome = dadosDoUsuario.Nome;
        userEntity.Email = dadosDoUsuario.Email;
        userEntity.Senha = dadosDoUsuario.Senha;

        this.userRepository.Save(userEntity)
        return {
            user: new ListUsersDTO(userEntity.Id, userEntity.Nome),
            message: `Usuário cadastrado com sucesso` };
    }

    @Get()
    async ListingUsers(){
        const usersSaves = await this.userRepository.List(); 
        const usersList = usersSaves.map(
            user => new ListUsersDTO(
                user.Id,
                user.Nome
            )   
        );
        return usersList;
    }

    @Put('/:id')
    async UpdateUser(@Param('id') pId: string, @Body() pDataUpdate: UpdateUserDTO){
        const userUpdate = await this.userRepository.Update(pId, pDataUpdate);

        return {
            user: userUpdate,
            message: 'Usuário atualizado com sucesso'
        }
    }

    @Delete('/:id')
    async RemoveUser(@Param('id') pId: string){
        const userRemoved = await this.userRepository.Delete(pId);
        return{
            user: userRemoved,
            message: 'Usuário removido com sucesso'
        }
    }
}