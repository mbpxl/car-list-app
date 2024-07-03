import axios from "axios";

const instance = axios.create({
  baseURL: "https://test.tspb.su/test-task/",
  withCredentials: true,
});

export type CarType = {
  id: number;
  name: string;
  model: string;
  year: number;
  price: number;
  color: string;
  latitude?: number;
  longitude?: number;
}

export const carsAPI = {
  async getCars() {
    const response = await instance.get<CarType[]>(`vehicles`);
    return response.data;
  }
}