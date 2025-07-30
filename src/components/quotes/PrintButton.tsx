import type { FC, RefObject } from "react"
import { useReactToPrint } from "react-to-print"

interface Props {
  ref: RefObject<HTMLDivElement | null> 
}

export const PrintButton: FC<Props> = ({ ref }) => {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: 'Cotizaicion'
  })
  return (
    <button
      onClick={handlePrint}
      className="no-print inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Imprimir Cotización
    </button>
  )
}
