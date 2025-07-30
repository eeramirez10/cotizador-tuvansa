
import { envs } from "../../config/envs"
import { postFetcher, postFileFetcher } from "../../config/utils/fetchers"
import { similaritiesMapper } from "./mapper"
import type { FileResponse, SimilaritiesResponse } from "./types"





const API_URL = `${envs.URL_GPT}`





export const uploadFile = async (file: File, fieldName: string) => {

  const resp = await postFileFetcher<FileResponse>(`${API_URL}/gpt/extract-items-quote`, file, fieldName)

  return resp
}

export const fetchSimilarities = async (description: string) => {

  const resp = await postFetcher<SimilaritiesResponse[]>(`${API_URL}/gpt/match-product`, { description })

  return resp.map((s) => similaritiesMapper({
    id: s.id,
    score: s.score,
    description: s.metadata.description,
    ean: s.metadata.ean
  }))
}