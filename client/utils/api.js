import axios from "axios";

const baseURL = "/api";
// "http://localhost:3000/api"

const apiInst = axios.create({ baseURL });

export const login = async (username) => {
  try {
    const { data } = await apiInst.post("/login", { username });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getKudosList = async () => {
  try {
    const { data } = await apiInst.get("/kudos");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const likeKudo = async (post, user, add_like) => {
  try {
    const { data } = await apiInst.post("/like", {
      post,
      user,
      add_like, // true/false
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addKudo = async (from, to, badge, reason) => {
  try {
    const { data } = await apiInst.post("/kudos", {
      from,
      to,
      badge,
      reason,
    });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAnalyticsData = async () => {
  try {
    const { data } = await apiInst.get("/analytics");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUsersList = async (user_id) => {
  try {
    const { data } = await apiInst.get(`/${user_id}/users`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getBadgesList = async () => {
  try {
    const { data } = await apiInst.get(`/badges`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
