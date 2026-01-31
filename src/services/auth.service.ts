import client from "./client.service";

type LoginData = {
    email_address: string;
    password: string;
}

export const login = async (data: LoginData) => {
    const response = await client.post("/auth/admin/login", data);
    return response.data;
};