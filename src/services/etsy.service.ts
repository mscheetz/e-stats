import Shop from "../interfaces/shop.interface";
import axios from 'axios';
import * as config from '../../config';
import User from "../interfaces/user.interface";
const baseUrl = config.ESTY_URL;
const apiKey = config.ETSY_API_KEY;

class EstyService {

    getShops = async() => {
        let shops: Shop[] = [];
        let endpoint = `/shops?api_key=${apiKey}&limit=100`;
        let runIt = true;
        let offset = 0;
        let i = 0;
        let total = 1000;

        while(runIt) {
            offset = i * 100;
            const url = `${baseUrl}${endpoint}&offset=${offset}`;

            try {
                const response = await axios.get(url);
                const datas = response.data;
                total = datas.count;
                datas.results.forEach(res => {
                    const shop: Shop = {                        
                        listing_active_count: res.listing_active_count,
                        num_favorers: res.num_favorers,
                        shop_id: res.shop_id,
                        shop_name: res.shop_name,
                        title: res.title,
                        user_id: res.user_id,
                        user: new User()
                    }

                    shops.push(shop);
                })
                if(total <= shops.length) {
                    runIt = false;
                }
                i++;
            } catch(err) {
                console.log(err);
                runIt = false;
            }
        }

        return shops;
    }

    getShopOwners = async(shops: Shop[]) => {
        for(let i = 0; i < shops.length; i++) {
            const url = `${baseUrl}/users/${shops[i].user_id}?api_key=${apiKey}`;

            try {
                const response = await axios.get(url);
                const datas = response.data.results[0];
                const user: User = {
                    city: datas.city,
                    region: datas.region,
                    transaction_sold_count: datas.transaction_sold_count,
                    user_id: datas.user_id,
                    user_profile_id: datas.user_profile_id,
                };
                shops[i].user = user;
            } catch(err) {
                console.log(err);
            }
        }

        return shops;
    }
}

export default EstyService;