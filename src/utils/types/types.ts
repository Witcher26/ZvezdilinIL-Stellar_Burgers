export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    qty: number;
    type: string;
    _id: string;
  };
  
  export type TConstructorIngredient = TIngredient & { key: string };
  
  export type TDropType = {
    onDrop: (item: TIngredient) => void;
  };
  
  export type TFormValues = {
    name: string;
    email: string;
    password: string;
  };