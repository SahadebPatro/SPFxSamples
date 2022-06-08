/****
Pnp list CRUD operations
https://pnp.github.io/pnpjs/v1/sp/docs/items/

Pnp Setup
https://pnp.github.io/pnpjs/v1/documentation/getting-started/

*****/


/**** Below code is for rererence purpose. As this below approach 
will not support in the current SPFx package versions
*****/

/* 
import * as _ from 'lodash';
import { sp, Web } from '@pnp/sp/presets/all';

interface IUserData {
    ID?: number;
    ProductLookupId: number;
    UserName: number;    
    Price?: number;
    Product?: string;
    ProductType?: string;
    Company?: string;
    Image?: string;
    IsSelected?: boolean;
    NoOfItems: number;
    TotalCost: number;
}
const LIST_NAMES = {
    ALL_PRODUCTS: "AllProducts",
    MY_CART: "MyCart"
};

// Get list Items
export async function GetListOfProducts() {
    let allProducts = [];    
    await sp.web.lists.getByTitle(LIST_NAMES.ALL_PRODUCTS)
        .items
        .select("*", "Attachments", "AttachmentFiles")
        .expand("AttachmentFiles")
        .top(4900)
        .get()
        .then((response) => {
            allProducts = response;
        });    
    return allProducts;
}

// Get list Items
export async function GetUserMappedData(userId: number) {
    let allItems = [];
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .select(
            "*",
            "ProductLookup/Price",
            "ProductLookup/Product",
            "ProductLookup/ProductType",
            "ProductLookup/Company",
            "ProductLookup/Image"
        )
        .expand("ProductLookup")
        .filter(`UserNameId eq '${userId}'`)
        .top(4900)
        .get()
        .then((response) => {           
            allItems = response;
        });

    return allItems;
}

// Add new Item
export async function AddToMyCart(userData: IUserData) {
    let response;
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .add({
            UserNameId: {
                results: [userData.UserName]
            },
            ProductLookupId: userData.ProductLookupId,
            NoOfItems: userData.NoOfItems,
            TotalCost: userData.TotalCost
        }).then(res => {
            response = res;
        });
    return response;
}

// Delete list item
export async function RemoveFromcart(itemID: number) {
    await sp.web.lists.getByTitle(LIST_NAMES.MY_CART)
        .items
        .getById(itemID)
        .delete();
} */

