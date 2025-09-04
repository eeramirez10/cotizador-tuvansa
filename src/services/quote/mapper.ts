import type { Similarity } from "./types"


export const similaritiesMapper =  async(json: Similarity): Promise<Similarity> => {


  return {
    id: json.id as string,
    score: json.score as number,
    description: json.description as string,
    ean: json.ean as string,
    warehouses: json.warehouses
  }

} 