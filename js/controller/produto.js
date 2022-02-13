class Product{
   constructor(id, name, price){
      this._id = id;
      this._name = name;
      this._price = price;
   }

   /* Methods Get's and Set's */
   get id(){
      return this._id;
   }
   set id(value){
      this._id = value;
   }

   get name(){
      return this._name;
   }
   set name(value){
      this._name = value;
   }

   get price(){
      return this._price;
   }
   set price(value){
      this._price = value;
   }

}