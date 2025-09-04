/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, Similarity } from "../../services/quote/types";

import { fecthProducts, fetchQuoteProducts, fetchSimilaritiesThunk } from "../thunks/productThunks";
import type { Status } from "../../components/BadgeStatus";



export interface Itemstate {
  items: Product[],
  loading: boolean
  error: string | null
  fetchingSimilarities: Record<string, boolean>
  fetchingProducts: boolean
  similaritiesError: Record<string, string | null>
}


const initialState: Itemstate = {
  items: [],
  loading: false,
  error: null,
  fetchingSimilarities: {},
  fetchingProducts: false,
  similaritiesError: {},

}

const recalc = (p: Product) => {
  const descuento = Number.isFinite(p.descuento) ? (p.descuento ?? 0) : 0
  p.subtotal = p.precioUnitario * p.cantidad

  p.total = p.subtotal - (p.subtotal * descuento) / 100

}

const itemslice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setitems: (state, action: PayloadAction<Product[]>) => {
      state.items = [...action.payload]
    },
    selectSimilarity: (
      state,
      action: PayloadAction<{ productId: string; warehouseId: string; similarity: Similarity }>
    ) => {
      const { productId, warehouseId, similarity } = action.payload
      const p = state.items.find(x => x.id === productId)
      if (!p) return

      // Usamos SOLO la similarity pasada como fuente de verdad
      const wh = similarity.warehouses?.find(w => w.id === warehouseId)

      p.ean = similarity.ean ?? ""
      p.status = "seleccionado" as Status
      p.selected = similarity
      p.selectedWarehouse = wh
      p.costoUnitario = wh?.cost ?? 0

      // Si manejas margen, ajusta el precio a partir del costo
      if (typeof p.margenUtilidad === "number") {

        p.precioUnitario = p.costoUnitario * (1 + p.margenUtilidad / 100)
      }

      recalc(p)
    },
    updatePrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload
      const p = state.items.find(x => x.id === id)
      if (!p) return
      p.precioUnitario = price
      recalc(p) // respeta descuento y actualiza subtotal/total
    },
    updateDescuento: (state, action: PayloadAction<{ id: string; descuento: number }>) => {
      const { id, descuento } = action.payload
      const p = state.items.find(x => x.id === id)
      if (!p) return
      p.descuento = Number.isFinite(descuento) ? descuento : 0
      recalc(p)
    },
    updateStatus: (state, action: PayloadAction<{ id: string; status: Status }>) => {
      const { id, status } = action.payload
      const p = state.items.find(x => x.id === id)
      if (p) p.status = status
    },
    setSimilaritiesOfProduct: (
      state,
      action: PayloadAction<{ productId: string; similarities: Similarity[] }>
    ) => {
      const { productId, similarities } = action.payload
      const p = state.items.find(x => x.id === productId)
      if (!p) return
      p.similarities = similarities ?? []
    },
    clearSelectionsOfProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const p = state.items.find(x => x.id === action.payload.productId)
      if (!p) return
      p.selected = undefined
      p.selectedWarehouse = undefined
    },
    clearSimilaritiesOfProduct: (state, action: PayloadAction<{ productId: string }>) => {
      const p = state.items.find(x => x.id === action.payload.productId)
      if (p) p.similarities = []
    },
    updateMargenUtilidad: (state, action: PayloadAction<{ id: string, margenUtilidad: number }>) => {
      const { id, margenUtilidad } = action.payload
      const p = state.items.find(x => x.id === id)
      if (!p) return
      p.margenUtilidad = margenUtilidad
      p.precioUnitario = p.costoUnitario * (1 + p.margenUtilidad / 100)
      recalc(p)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSimilaritiesThunk.pending, (state, action) => {
        const { productId } = action.meta.arg
        state.fetchingSimilarities[productId] = true
        state.similaritiesError[productId] = null
      })
      .addCase(fetchSimilaritiesThunk.fulfilled, (state, action) => {

        const { similarities, productId } = action.payload

        const product = state.items.find((product) => product.id === productId)

        if (product) {
          product.similarities = [...similarities]
        }
        state.fetchingSimilarities[productId] = false

      })
      .addCase(fetchSimilaritiesThunk.rejected, (state, action) => {
        const fallback = action.meta.arg as { productId: string }
        const productId =
          (action.payload as any)?.productId ?? fallback?.productId ?? 'unknown'
        const message =
          (action.payload as any)?.message ??
          action.error.message ??
          'Error al obtener similares'

        state.fetchingSimilarities[productId] = false
        state.similaritiesError[productId] = message
      })
    builder
      .addCase(fecthProducts.pending, (state) => {
        state.fetchingProducts = true
        state.error = null
      }).addCase(fecthProducts.fulfilled, (state, action) => {

        state.fetchingProducts = false
        state.items = action.payload
      })

    builder
      .addCase(fetchQuoteProducts.pending, (state) => {
        state.fetchingProducts = true
        state.error = null
      })
      .addCase(fetchQuoteProducts.fulfilled, (state, action) => {
        state.fetchingProducts = false
        state.items = action.payload
      })


  }
})


export const {
  setitems,
  selectSimilarity,
  updatePrice,
  updateDescuento,
  updateStatus,
  setSimilaritiesOfProduct,
  clearSelectionsOfProduct,
  clearSimilaritiesOfProduct,
  updateMargenUtilidad
} = itemslice.actions

export default itemslice.reducer;