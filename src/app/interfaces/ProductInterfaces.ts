export interface ProductAvailablesResponse {
    ok:       boolean;
    products: Product[];
}

export interface Product {
    imgs?:      any[];
    available?: boolean;
    _id?:       string;
    name?:      string;
    price?:     number;
    user?:      string;
    __v?:       number;
}
