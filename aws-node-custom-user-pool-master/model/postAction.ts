import { EntityBase } from './base';
import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './';
import { count } from 'console';
import { isDeepStrictEqual } from 'util';
import { getUserById } from '../controller/user';
import { createPoolCluster } from 'mysql2';

export interface PostAction extends EntityBase {
    // First Name of the user
    name: string;
    userId:string;
    postId:string;
    // Indicates the category of action
    aserType: ActionType;

}

export enum ActionType {
    like = 'like',
    dislike = 'dislike'
}

type PostActionStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): PostAction;
};

const PostAction = < PostActionStatic ><unknown>sequelize.define('PostAction', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    postId: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    userId: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    actionType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['like','dislike']
    },

});


export default PostAction;
