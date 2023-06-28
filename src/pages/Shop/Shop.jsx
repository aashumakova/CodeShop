import ShopList from "../../components/ShopList/ShopList";
import CategoryList from "../../components/CategoryList/CategoryList";
import * as itemsAPI from "../../utilities/items-api"
import { useState, useEffect, useRef } from 'react';

export default function Shop() {

const [shopItems, setShopItems] = useState([])
const categoriesRef = useRef([])

    useEffect(() =>{
        console.log("use effect will get items")
        getItems()
        console.log("use effect called getItems()")
    }, [])
        async function getItems() {
            const items = await itemsAPI.getAll();
            categoriesRef.current = [...new Set(items.map(item => item.category.name))];
            console.log("current categories", categoriesRef.current)
            setShopItems(items);
        }


    return (
        <>
            <h3>
                <CategoryList categories={categoriesRef.current}/>
            </h3>
            <div>
            {shopItems.length ? (
                <ShopList shopItems={shopItems}/>
                )
: (
    <div>
        loading...
    </div>
    )

            }
            </div>
            <div className="item-list"></div>
        </>
    )
}