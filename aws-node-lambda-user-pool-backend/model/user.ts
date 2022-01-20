import { EntityBase } from './base';
import { Model, DataTypes, BuildOptions } from 'sequelize';
import { sequelize } from './';
import Post from './post';
import PostAction from './postAction';

export interface User extends EntityBase {
    // First Name of the user
    name: string;
    // User email id
    email: string;
    // Indicates whether the email Id has been verified or not
    emailVerified: boolean;
    // Indicates the category of user
    userType: UserType;
    // Current state of the User
    currentState: UserCurrentState;
}

export enum UserType {
    Blogger = 'Blogger',
    Reader = 'Reader',
    Admin = 'Admin'
}

export enum UserCurrentState {
    Active = 'Active',
    Inactive = 'Inactive',
    Removed = 'Removed',
    Pending = 'Pending'
}

type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): User;
};

const User = < UserStatic ><unknown>sequelize.define('User', {
    id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        type: DataTypes.UUID
    },
    name: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userType: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Blogger', 'Reader','Admin']
    },
    currentState: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Active', 'Inactive', 'Removed', 'Pending']
    }
});

User.hasMany(Post,{targetKey: "id",foreignKey: 'UserId'});
Post.belongsTo(User,{targetKey: "id",foreignKey: 'UserId'});

export default User;
