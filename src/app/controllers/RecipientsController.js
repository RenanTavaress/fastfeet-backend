const Recipient = require('../models/Recipients')

class RecipientsController{
   async store(req, res){

      const { 
         id, nome, rua, numero, estado, cidade , cep
      } = await Recipient.create(req.body)

      return res.json({
         id, 
         nome, 
         rua, 
         numero, 
         estado, 
         cidade, 
         cep
      })

   }

   async update(req, res){
      const { id } = req.params
      const recipients = await Recipient.findByPk(id)
      console.log(id)

      const { 
         nome, rua, numero, complemnto, estado, cidade, cep
      } = await recipients.update(req.body)
      console.log(id)

      return res.json({
         id, 
         nome, 
         rua, 
         numero,
         complemnto,
         estado, 
         cidade, 
         cep
      })
   }
}

module.exports = new RecipientsController()