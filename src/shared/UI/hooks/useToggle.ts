import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/useStore'
import {  toggleRow } from '../../../store/slices/uiSlice';

export const useToggle = () => {

  const toggle = useAppSelector((state) => state.ui.toggle);
  const dispatch = useDispatch()

  const handleToggleExpansion = (id: string) => {
    
    dispatch(toggleRow({ id }))
  }

  return {
    toggle,
    handleToggleExpansion
  }
}


