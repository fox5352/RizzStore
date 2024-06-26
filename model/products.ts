import supabase from "./db";

export interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    details: string;
    in_stock: boolean;
    best_seller: boolean;
    image_url: string;
}


export async function createProduct(title: string, detail: string, price: number, in_stock: boolean, best_seller: boolean, image_url: string): Promise<Product | null> {
    const { data, error } = await supabase.from("products").insert({
        title,
        detail,
        price,
        in_stock,
        best_seller,
        image_url
    });

    if (error) {
        console.error(error);
        return null;
    }
    return data;
}

export async function getPaginatedProducts(page: number, limit: number): Promise<Product[] | null> {
    const { data, error } = await supabase.from("products").select("*").range(page * limit, (page + 1) * limit);

    if (error) {
        console.error(error);
        return null;
    }
    return data;
}

export async function getProductByID(id: number): Promise<Product | null> {
    const { data, error } = await supabase.from("products").select("*").eq("id", id);
    if (error) {
        console.error(error);
        return null;
    }
    return data;
}

export async function getProductsByTitle(title: string, page: number, limit: number): Promise<Product[] | null> {
    const { data, error } = await supabase.from("products").select("*").ilike("title", `%${title}%`).range(page * limit, (page + 1) * limit);
    if (error) {
        console.error(error);
        return null;
    }
    return data;
}

export async function getLowestPriceProducts(limit: number): Promise<Product[] | null> {
    const { data, error } = await supabase.from("products").select("*").order("price", { ascending: true }).limit(limit);

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getFeaturedProducts(): Promise<Product[] | null> {
    const { data, error } = await supabase.from("products").select("*").eq("best_seller", true).limit(3);

    if (error) {
        console.error(error);
        return null;
    }


    return data;
}
