import User from "./user.interface";

class Shop {
    constructor() {}
    
    shop_id: number;
    shop_name: string;
    user_id: string;
    title: string;
    listing_active_count: number;
    num_favorers: number;
    user: User;
}

export default Shop;