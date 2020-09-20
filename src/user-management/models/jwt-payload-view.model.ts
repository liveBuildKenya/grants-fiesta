/**
 * Represents the jwt token payload
 */
export interface JwtPayloadViewModel {
    /**
     * Gets or sets the id
     */
    _id: string;

    /**
     * Gets or sets the name
     */
    name: string;

    /**
     * Gets or sets the issued at date
     */
    iat: number;

    /**
     * Gets or sets the expiry date
     */
    exp: number;
}