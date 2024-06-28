import axios, { isAxiosError, AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://foodeem-zgft.vercel.app/"
    : "http://localhost:3001/";

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 3000, // in ms, after 3sec will throw error if call is not returned
});

interface DeleteData {
  recipeId: number;
}

const deleteRecipeWithData = (url: string, recipeId: DeleteData) => {
  const config: AxiosRequestConfig = {
    data: recipeId,
  };
  return customAxios.delete(url, config);
};

export { customAxios, isAxiosError, AxiosError, deleteRecipeWithData };
