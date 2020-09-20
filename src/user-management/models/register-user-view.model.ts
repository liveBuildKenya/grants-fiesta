/**
 * Represents a register user view model
 */

import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserViewModel {
    emailVerified: boolean;

    /**
     * Gets or sets the name
     */
    @ApiProperty()
    name: string;

    /**
     * Gets or sets the email
     */

     @ApiProperty()
    email: string;

    /**
     * Gets or sets the password
     */
    @ApiProperty()
    password: string;

    /**
     * Gets or sets the date created
     */
    dateCreated: Date;
}