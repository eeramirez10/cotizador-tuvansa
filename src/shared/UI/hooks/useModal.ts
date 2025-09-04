
import { useAppDispatch, useAppSelector } from '../../../store/useStore'
import { closeModal, openModal, selectModal } from '../../../store/slices/uiSlice';

export const useModal = () => {

  const modal = useAppSelector(selectModal('uploadQuoteModal') );

  const dispatch = useAppDispatch()
  const handleOpenModal = () => {
    dispatch(openModal({id:'uploadQuoteModal'}))
  }

  const handleCloseModal = () => {
    dispatch(closeModal({id:'uploadQuoteModal'}))
  }


  return {
    modal,
  
    handleOpenModal,
    handleCloseModal
  }
}
