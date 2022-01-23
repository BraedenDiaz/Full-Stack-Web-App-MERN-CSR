import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config/config";

/**
 * @author Braeden Diaz
 */

export async function hashAndSaltPassword(password : string) : Promise<string | null>
{
    try
    {
        const salt : string = await bcrypt.genSalt(SALT_ROUNDS);
        const hash : string = await bcrypt.hash(password, salt);
        return hash;
    }
    catch (err)
    {
        console.log(err);
    }

    return null;
}

export async function authenticatePassword(password : string, hash : string) : Promise<boolean>
{
    try
    {
        const matchFound : boolean = await bcrypt.compare(password, hash);
        return matchFound;
    }
    catch (err)
    {
        console.log(err);
    }

    return false;
}