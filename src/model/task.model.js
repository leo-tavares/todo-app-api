class taskModel{
    constructor({title,description,status,data,id_user}){
         this.title = title,
         this.description = description,
         this.status = status,
         this.data = data,
         this.id_user = id_user
   }
}
module.exports = taskModel;