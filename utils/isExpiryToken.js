const isExpiryToken =(decoded)=>{
      const iat = decoded.iat;
      const exp = decoded.exp;
 if (exp > iat) {
      return decoded;
      }else{
        return true
      }
}

module.exports = isExpiryToken;