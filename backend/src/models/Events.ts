import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User"; 
import EventsOpt from "./EventsOpt"; 

interface EventsAttributes {
    events_id: number;
    hr_id: number;
    vendor_id: number;
    events_opt_id: number;
    proposed_dates: Date[];
    location: string;
    status: "Pending" | "Approved" | "Rejected";
    description: string;
    rejection_remarks: string | null;
    confirmed_date: Date | null;
    created_at: Date;
}

interface EventsCreationAttributes extends Optional<EventsAttributes, 'events_id' | 'rejection_remarks' | 'confirmed_date' | 'created_at'> {}

class Events extends Model<EventsAttributes, EventsCreationAttributes> implements EventsAttributes {
    public events_id!: number;
    public hr_id!: number;
    public vendor_id!: number;
    public events_opt_id!: number;
    public proposed_dates!: Date[];
    public location!: string;
    public status!: "Pending" | "Approved" | "Rejected";
    public description!: string;
    public rejection_remarks!: string | null;
    public confirmed_date!: Date | null;
    public created_at!: Date;
}

Events.init({
    events_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
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
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'user_id'
        },
        onDelete: 'CASCADE',
    },
    events_opt_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EventsOpt, 
            key: 'events_opt_id'
        },
        onDelete: 'CASCADE',
    },
    proposed_dates: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        allowNull: false,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rejection_remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    confirmed_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    tableName: 'events',
    timestamps: false, 
});

export default Events;