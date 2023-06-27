import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository{
    private usuarios: UserEntity[] = [];

    private async FindUserID(pId: string): Promise<UserEntity>{
        const possibleUser = this.usuarios.find(
            userDeleted => userDeleted.Id === pId
        );

        if (!possibleUser) {
            throw new Error('Usuário não foi encontrado');
        }

        return possibleUser;
    }

    async Save(usuario: UserEntity){
        this.usuarios.push(usuario);
    }

    async List(): Promise<UserEntity[]>{
        return this.usuarios;
    }

    async ExistsEmail(email: string): Promise<boolean>{
        const userFuture = this.usuarios.find(
            user => user.Email === email
        );
        return userFuture !== undefined;
    }

    async Update(pId: string, pDatasUpdates: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.FindUserID(pId);

        Object.entries(pDatasUpdates).forEach(([chave, valor]) => {
            if (chave === 'id') {
                return;
            }

            user[chave] = valor;
        });
        return user;
    }

    async Delete(pId: string): Promise<UserEntity>{
        const user = await this.FindUserID(pId);
        this.usuarios = this.usuarios.filter(
            userSave => userSave.Id !== pId
        )
        return user;
    }
}