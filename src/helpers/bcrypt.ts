import bcrypt from "bcrypt";

export const encrypt = async (notEncryptedPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(notEncryptedPassword, salt);

    return hash;
};

export const compareHash = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
};