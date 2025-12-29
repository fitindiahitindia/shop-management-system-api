class validate{
    mobileNoValidate(value){
        if(value == null || value == undefined || value == ''){
            return false;
        }else if(value.toString().length != 10){
            return false;
        }else if(typeof(value) != "number"){
            return false;
        }else if(value.toString().charAt(0) < '6'){
            return false;
        }
        else{
            return true;
        }
    }
}
module.exports = validate;