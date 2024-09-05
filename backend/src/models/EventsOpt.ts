import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Events from "./Events";

interface EventsOptAttributes {
    events_opt_id: number;
    events_opt_name: string;
    hr_id: number;
    created_at: Date;
}

interface EventsOptCreationAttributes extends Optional<EventsOptAttributes, 'events_opt_id' | 'created_at'> {}

class EventsOpt extends Model<EventsOptAttributes, EventsOptCreationAttributes> implements EventsOptAttributes {
    public events_opt_id!: number;
    public events_opt_name!: string;
    public hr_id!: number;
    public created_at!: Date;
}

EventsOpt.init({
    events_opt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    events_opt_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hr_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'user_id'
        },
        onDelete: 'CASCADE', 
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    tableName: 'events_opt',
    timestamps: false 
});

EventsOpt.hasMany(Events, { foreignKey: 'events_opt_id' });

export default EventsOpt;