import {DataTypes, Model, Optional} from "sequelize"
import { sequelize } from "../config/database"

interface UserAttributes{
    user_id: number;
    username: string;
    password: string;
    company_name: string;
    role: "HR" | "VENDOR" | "ADMIN";
    created_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'| 'created_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public username!: string;
    public password!: string;
    public company_name!: string;
    public role!: 'HR' | 'VENDOR' | 'ADMIN';
    public created_at!: Date;

}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('HR', 'VENDOR', 'ADMIN'),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});

export default User;