/* eslint-disable @typescript-eslint/no-explicit-any */
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { Product } from "../services/quote/types";
import { selectSimilarity, updatePrice, updateStatus, updateMargenUtilidad } from "./slices/ productSlice";
import { type ModalId, setModalLoading, closeModal } from "./slices/uiSlice";
import { fetchSimilaritiesThunk, saveProductsToLocalStorage, fetchQuoteProducts } from "./thunks/productThunks";


export const listenMiddleware = createListenerMiddleware()

let t: number | undefined;
const flushSoon = (fn: () => void, ms = 120) => {
  window.clearTimeout(t);
  t = window.setTimeout(fn, ms);
};

listenMiddleware.startListening({
  matcher: isAnyOf(
    fetchSimilaritiesThunk.fulfilled,
    selectSimilarity,
    updatePrice,
    updateStatus,
    updateMargenUtilidad
  ),
  effect: async (_, api) => {

    const state = api.getState() as any;
    const products = state.products.items as Product[]

    flushSoon(() => saveProductsToLocalStorage(products))


  }
})




listenMiddleware.startListening({
  matcher: isAnyOf(
    fetchQuoteProducts.fulfilled,
    fetchQuoteProducts.rejected,
    fetchQuoteProducts.pending
  ),
  effect: async (action, api) => {
    const modalId: ModalId = 'uploadQuoteModal'




    if (fetchQuoteProducts.pending.match(action)) {
      api.dispatch(setModalLoading({ id: modalId, loading: true }))
      return
    }

    if (fetchQuoteProducts.fulfilled.match(action)) {

      api.dispatch(setModalLoading({ id: modalId, loading: false }))
      api.dispatch(closeModal({ id: modalId }))

      return
    }

    if (fetchQuoteProducts.rejected.match(action)) {
      api.dispatch(setModalLoading({ id: modalId, loading: false }))
      return
    }

  }
})