import { sequelize } from '../db.js'
import { DataTypes } from 'sequelize'

 export const SemiFinishedProduct = sequelize.define(
    "SemiFinishedProduct",
    {
        id:{type: DataTypes.INTEGER,allowNull: false,primaryKey:true,autoIncrement:true},
        totalQuantity:{type: DataTypes.INTEGER,allowNull: false,}
    }
)
 export const  Packaging = sequelize.define(
    "Packaging",
    {
        id:{type: DataTypes.INTEGER,allowNull: false,primaryKey:true,autoIncrement:true},
        quantity:{type: DataTypes.INTEGER,allowNull: false,},
        quantity_in_pieces_pkg:{type: DataTypes.INTEGER,allowNull: false,},
        semiFinishedProduct_id:{type: DataTypes.INTEGER,}
    }
)
 export const  Defect = sequelize.define(
    "Defect",
    {
        id:{type: DataTypes.INTEGER,allowNull: false,primaryKey:true,autoIncrement:true},
        weight:{type: DataTypes.INTEGER,},
        quantity_in_pieces_defect:{type: DataTypes.INTEGER,allowNull: false,},
        semiFinishedProduct_id:{type: DataTypes.INTEGER, }}
    )
    SemiFinishedProduct.hasMany(Packaging,{ foreignKey: 'semiFinishedProduct_id' })
    Packaging.belongsTo(SemiFinishedProduct,{ foreignKey: 'semiFinishedProduct_id' })

    SemiFinishedProduct.hasMany(Defect,{ foreignKey: 'semiFinishedProduct_id' })
    Defect.belongsTo(SemiFinishedProduct,{ foreignKey: 'semiFinishedProduct_id' })