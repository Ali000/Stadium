import Client from "./api";

export const SignIn = async (data) => {
    try {
        const res = await Client.post("/auth/signin", data);
        return res.data.user;
    } catch (error) {
        throw error;
    }
}

export const SignUp = async (data) => {
    try {
        const res = await Client.post("/auth/signup", data);
        return res.data;
    } catch (error) {
        throw error
    }
}

export const checkSession = async () => {
    try {
        const res = await Client.get("/auth/session");
        return res.data;
    } catch (error) {
        throw error;
    }
}