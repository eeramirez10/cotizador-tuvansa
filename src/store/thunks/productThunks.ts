import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSimilarities, uploadFile } from "../../services/quote/api";
import type { Product } from "../../services/quote/types";
import type { Itemstate } from "../slices/ productSlice";





export const fecthProducts = createAsyncThunk(

  'products/fetchProducts', async (_, { rejectWithValue }) => {

    try {

      const productosLocalStorage = localStorage.getItem('productos')
      if (!productosLocalStorage) return []
      const products = JSON.parse(productosLocalStorage)

      return products

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error al obtener Products')
    }

  }
)

export const fetchSimilaritiesThunk = createAsyncThunk(
  'products/fetchSimilarities',
  async ({ description, productId }: { description: string, productId: string }, { signal, rejectWithValue }) => {
    try {


      const similarities = await fetchSimilarities(description, { signal });



      return { similarities, productId };

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al obtener similares'
      return rejectWithValue({ message: msg, productId })
    }
  }, {
  condition: ({ productId }, { getState }) => {
    const state = getState() as { products: Itemstate }

    return !state.products.fetchingSimilarities[productId]
  }
})

export const fetchQuoteProducts = createAsyncThunk(
  'products/fetchQuoteProducts',
  async (archivo: File, { rejectWithValue }) => {

    try {

      const resp = await uploadFile(archivo, 'quote')

      const products: Product[] = resp.quotation.map<Product>((q) => ({

        id: q.id,
        description: q.description,
        cantidad: q.cantidad,
        unidad: q.unidad,
        codigo: '',
        ean: '',
        status: 'pendiente',
        margenUtilidad: 10,
        similarities: [],
        selected: undefined,
        selectedWarehouse: undefined,
        precioUnitario: 0,
        costoUnitario: 0,
        descuento: 0,
        subtotal: 0,
        total: 0,

      }))

      saveProductsToLocalStorage(products)

      return products

    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Error al Subir el archivo')
    }

  }
)

export const uploadQuotePdfThunk = createAsyncThunk(
  'products/uploadQuotePdf',
  async ({ file }: { file: File }, { rejectWithValue }) => {

    try {
      const resp = await uploadFile(file, 'quote')

      const products = resp.quotation.map<Product>((q) => ({
        ...q,
        ean: '',
        codigo: '',
        status: 'pendiente',
        similarities: [],
        selected: undefined,
        precioUnitario: 0,
        costoUnitario: 0,
        descuento: 0,
        subtotal: 0,
        total: 0

      }))

      saveProductsToLocalStorage(products)

      return products

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al procesar el PDF'
      return rejectWithValue(msg)
    }
  }
)

export const saveProductsToLocalStorage = (products: Product[]) => {

  localStorage.setItem('productos', JSON.stringify(products))
}

