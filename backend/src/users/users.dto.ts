

export class CreateUserDto {
    userId: number;
    username: string;
    password: string;
    isAdmin?: boolean;
}
