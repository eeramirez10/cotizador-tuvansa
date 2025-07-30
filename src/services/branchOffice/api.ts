import { envs } from "../../config/envs";
import { postFetcher } from "../../config/utils/fetchers";
import type { Warehouse } from "../quote/types";



const API_URL = `${envs.URL}`


export const getWarehouses = async (ean: string) => {

  console.log(encodeURIComponent(ean))
  const resp = await postFetcher<Warehouse[]>(`${API_URL}/warehouse`, { ean })


  return resp
}