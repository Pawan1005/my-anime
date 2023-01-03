import axios from "axios";

export const getAllData = async (pageNo, limit, searchName) => {
    return axios.get(`https://api.jikan.moe/v4/characters?page=${pageNo || 0}&limit=${limit || 15}&q=${searchName || ""}&order_by=favorites&sort=desc`);
};
