import { getRepository } from "../../db";
import { User } from "../entity/user";

const getUser = async (username: string) => {
    const repo = getRepository(User);
    return repo.findOne({
        where: {
            username
        }
    });
};

const getUserById = async (id: number) => {
    const repo = getRepository(User);
    return repo.findOne({
        where: {
            id
        }
    });
};

const getUserId = async (username: string) => {
    const repo = getRepository(User);
    const user = await repo.findOne({
        where: {
            username
        }
    });
    return user?.id;
};

const addUser = async (username: string) => {
    const repo = getRepository(User);
    const result = await repo.insert({
        username,
        rawLastUpdate: new Date().valueOf()
    });

    const id = result.identifiers[0].id as number;

    return getUserById(id);
};

const updateUser = async (username: string) => {
    const repo = getRepository(User);
    const result = await repo.update({
        username
    }, {
        rawLastUpdate: new Date().valueOf()
    });

    return !!result.affected;
};

export {
    getUser, getUserId, getUserById, addUser, updateUser
};
