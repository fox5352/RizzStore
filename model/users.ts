import supabase from "./db";

interface User {
  id: string;
  email: string;
  created_at: string;
};

export async function getUserByEmail(email: string): Promise<User | null> {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        if (error) {
            throw error;
        }
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createUser(email: string, name: string): Promise<User | null> {
    try {
        const { data, error } = await supabase.from('users').insert({ email, name });
        if (error) {
            throw error;
        }
        if (data && data.length > 0) {
            return data[0] as User;
        } else {
            console.error("User created but no data returned");
            return null;
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}