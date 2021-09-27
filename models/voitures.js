const mongoose= require('mongoose')
const Schema= mongoose.Schema

//create schema
const VoitureSchema= new Schema({
    user: {
        type: Schema.Types.ObjectId
      },
    marque:{
        type:String,
        require:true
    },
    photo:{
        type:String,
        require:true
    },
    comment:[
        {
            user: {
              type: Schema.Types.ObjectId
            },
            text: {
              type: String,
              required: true
            },
            name: {
              type: String
            },
            
            date: {
              type: Date,
              default: Date.now
            }
          }
        ]
})
module.exports= Voiture=mongoose.model("voiture",VoitureSchema)

