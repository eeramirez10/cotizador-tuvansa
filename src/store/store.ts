

// store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slices/ productSlice'
import UIReducer from './slices/uiSlice'
import { listenMiddleware } from './listener'


export const store = configureStore({
  reducer: { products: productReducer, ui: UIReducer },
  middleware: getDefault => getDefault().prepend(listenMiddleware.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch