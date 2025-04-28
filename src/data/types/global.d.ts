import { PaginateModel } from "@/src/common/model/paginate.model";
import { CartItemModel } from "../model/cart.model";
import { CouponModel } from "../model/coupon.model";
import { ProductModel } from "../model/product.model";
import { ShopModel } from "../model/shop.model";

export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
}

interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CategoryType {
    id: number;
    name: string;
    image: string;
}

export interface NotificationType {
    id: number;
    title: string;
    message: string;
    timestamp: string;
}

export interface CartItemType {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

// MAIN

export interface ColorType {
    id: number,
    color_name: string,
    image_url: string
}

export interface SizeType {
    id: number,
    size_code: string,
}

type CartShopFinalType = {
    cart_shop_id: number;
    shop: ShopModel;
    cart_items: CartItemModel[];
    selected_coupon: CouponModel;
    shop_total: number;
    shop_discount: number;
    shop_final_total: number;
}

type ProductPaginate = {
    products: ProductModel[];
    paginate: PaginateModel;
}