export const envs = {
  URL_GPT: import.meta.env.PROD
    ?
    import.meta.env.VITE_API_PROD
    :
    import.meta.env.VITE_API_DEV_GPT,
  URL: import.meta.env.PROD
    ?
    import.meta.env.VITE_API_PROD
    :
    import.meta.env.VITE_API_DEV,
}