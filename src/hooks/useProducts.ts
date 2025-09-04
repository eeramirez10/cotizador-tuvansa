import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/useStore';
import { fecthProducts, fetchQuoteProducts, fetchSimilaritiesThunk } from '../store/thunks/productThunks'
import { selectSimilarity, updateDescuento, updatePrice, updateStatus } from '../store/slices/ productSlice'
import type { Status } from '../components/BadgeStatus'
import type { Similarity } from '../services/quote/types'
import { closeRow } from '../store/slices/uiSlice';


export const useProducts = () => {

  const products = useAppSelector((state) => state.products.items)
  const loading = useAppSelector((state) => state.products.loading)
  const fetchingSimilarities = useAppSelector((state) => state.products.fetchingSimilarities)
  const fetchingProducts = useAppSelector((state) => state.products.fetchingProducts)
  const dispatch = useAppDispatch()

  useEffect(() => {

    dispatch(fecthProducts())

  }, [dispatch])




  const handleUploadProcessQuoteFile = (archivo: File) => {

    dispatch(fetchQuoteProducts(archivo))

  }

  const handleFindSimilarities = async (description: string, productId: string) => {

    dispatch(fetchSimilaritiesThunk({ description, productId }))

  }

  const handleUpdatePrice = (price: number, productId: string) => {


    dispatch(updatePrice({ id: productId, price }))


  }

  const handleSetDisccount = (discount: number, productId: string) => {

    dispatch(updateDescuento({ id: productId, descuento: discount }))

  }

  const handleUpdateStatus = (status: Status, productId: string) => {

    dispatch(updateStatus({ id: productId, status }))
  }

  // const handleSetSimilarities = (similarities: Similarity[], productId: string) => {


  // }

  const handleSelectSimilarity = (productId: string, warehouseId: string, similarity: Similarity) => {
    dispatch(selectSimilarity({ productId, warehouseId, similarity }))
    dispatch(closeRow({ id: productId }))
  }



  return {
    products,
    loading,
    fetchingSimilarities,
    handleUploadProcessQuoteFile,
    handleFindSimilarities,
    handleUpdateStatus,
    handleSelectSimilarity,
    handleSetDisccount,
    handleUpdatePrice,
    fetchingProducts


  }
}
