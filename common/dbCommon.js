 class findDbCommon{
    constructor(model){
        this.model = model;
    }

    //find by id
    async findByIdFun(id){
        try{
            return await this.model.findById(id);
        }catch(err){
            console.log(err);
        }
    }
    //find by id and update
    async findByIdAndUpdateFun(id,updatedData){
        try{
            return await this.model.findByIdAndUpdate(id,updatedData);
        }catch(err){
            console.log(err);
        }
    }
 }


 class insertDbCommon{
    constructor(model){
        this.model = model;
    }
    // create new document
    async create(data){
        try{
            return await this.model.create(data)
        }catch(error){
            console.log(error)
        }
    }
}

 module.exports = {findDbCommon,insertDbCommon};