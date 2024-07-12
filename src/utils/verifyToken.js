export const verifyToken = async (token) => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    try {
        const response = await axios.get(`${url}/users-front-login/`, { token })
        return response.data.result.userToken.token;
    } catch (error) {
        return null;
    }
};
