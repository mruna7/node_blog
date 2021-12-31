import { EntityBase } from './base';
import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './';

export interface Post extends EntityBase {
    // First Name of the user
    title: string;
    // User email id
    content: string;
    postType:string;
    userId:string;
    img:string;
}

export enum UserType {
}


type PostStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): Post;
};

const Post = < PostStatic ><unknown>sequelize.define('Post', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    content: {
        type: new DataTypes.STRING(1024),
        allowNull: false
    },
    postType: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    img: {
        type: new DataTypes.STRING(1024),
        allowNull: false
    },
    userId: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    }
});


export default Post;
