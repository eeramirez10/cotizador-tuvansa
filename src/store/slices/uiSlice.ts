import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export type ModalId = 'uploadQuoteModal'


interface ModalInfo {
  isOpen: boolean
  loading: boolean
  error: string | null
}



interface UIState {
  modals: Record<ModalId, ModalInfo>
  toggle: Record<string, boolean>
}

const initialState: UIState = {
  modals: {
    uploadQuoteModal: {
      isOpen: false,
      loading: false,
      error: null
    }
  },
  toggle: {}
}


const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ id: ModalId }>) => {
      const { id } = action.payload
      state.modals[id].isOpen = true
    },
    closeModal: (state, action: PayloadAction<{ id: ModalId }>) => {
      const { id } = action.payload
      state.modals[id].isOpen = false
    },
    setModalLoading: (state, action: PayloadAction<{ id: ModalId; loading: boolean }>) => {
      const { id, loading } = action.payload
      state.modals[id] = { ...(state.modals[id] ?? {}), loading }
    },
    setModalError: (state, action: PayloadAction<{ id: ModalId; error: string | null }>) => {
      const { id, error } = action.payload
      state.modals[id] = { ...(state.modals[id] ?? {}), error }
    },
    toggleRow: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.toggle[id] = !state.toggle[id]
    },
    closeRow: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      state.toggle[id] = false
    }
  }
})

export const { openModal, closeModal, setModalLoading, setModalError, toggleRow, closeRow } = uiSlice.actions
export default uiSlice.reducer

export const selectModal = (id: ModalId) => (s: { ui: UIState }) => s.ui.modals[id] ?? { isOpen: false }
export const selectModalOpen = (id: ModalId) => (s: { ui: UIState }) => !!(s.ui.modals[id]?.isOpen)
