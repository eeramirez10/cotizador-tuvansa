import type { Similarity } from "./types"


export const similaritiesMapper = (json: Similarity): Similarity => {


  return {
    id: json.id as string,
    score: json.score as number,
    description: json.description as string,
    ean: json.ean as string
  }

} 