import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export default class EmailIsUniqueValidator implements ValidatorConstraintInterface{

    constructor(private userRepository: UserRepository) {}

   async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const userEmailExists = await this.userRepository.ExistsEmail(value);
        return !userEmailExists; 
    }
}
export const EmailIsUnique = (optionsValidations: ValidationOptions) => { // Método padrão para criar um Decorator
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: optionsValidations,
            constraints: [],
            validator: EmailIsUniqueValidator
        })
    }
}