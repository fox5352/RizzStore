import supabase from "./db";

interface Product {
    id: number;
    title: string;
    price: number;
    detail: string;
    in_stock: boolean;
    best_seller: boolean;
    image_url: string;
}


export async function createProduct(title:string, detail: string, price: number, in_stock: boolean, best_seller: boolean, image_url: string): Promise<Product | null> {
    const { data, error} = await supabase.from("products").insert({
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

export async function getFeaturedProducts(): Promise<Product[] | null> {
    const { data, error } = await supabase.from("products").select("*").eq("best_seller", true);
    if (error) {
        console.error(error);
        return null;
    }

    const max = 3;

    const random = data.sort(() => Math.random() - 0.5).slice(0, max);

    return random;
}