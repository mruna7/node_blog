import { EntityBase } from './base';
import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './';
import User from './user';
import PostAction from './postAction';

export interface Post extends EntityBase {
    title: string;
    content: string;
    postType:string;
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
    isDeleted:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

Post.hasMany(PostAction);

export default Post;
