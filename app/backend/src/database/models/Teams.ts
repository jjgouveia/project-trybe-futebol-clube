import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Teams, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Teams.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Teams;
