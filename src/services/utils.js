export const checkResponse = async (res) => {
    if (res.ok) {
        return res.json();
    }

    const error = await res.json();
    return Promise.reject(error);
};