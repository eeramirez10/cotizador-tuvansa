import { CheckCircle, ChevronDown, ChevronUp, Loader2, Search } from 'lucide-react'
import React, {  type FC } from 'react'
import { ExpandedRow } from './ExpandedRow'
import { BadgeStatus, } from './BadgeStatus'
import { formatCurrency } from '../config/utils/format';
import type { Similarity } from '../services/quote/types'
import { AnimatePresence, motion } from 'framer-motion'
import { useProducts } from '../hooks/useProducts';
import { UtilityInput } from './UtilityInput';
import { useToggle } from '../shared/UI/hooks/useToggle';




export const TableQuotes = () => {


  const { handleFindSimilarities, fetchingSimilarities, products: quote, handleUpdateStatus, handleSelectSimilarity, handleSetDisccount, handleUpdatePrice } = useProducts()
  const { toggle:productosExpandidos, handleToggleExpansion:toggleExpansion } = useToggle()

  const hadleChageValue = (value: string, productId: string, field: 'price' | 'discount') => {

    const newValue = parseFloat(value);


    if (field === 'price') {

      if (value === '' || isNaN(newValue)) {
        handleUpdatePrice(0, productId)

        return
      }

      // Solo acepta hasta 2 decimales
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        handleUpdatePrice(newValue, productId)
      }

      return
    }

    if (field === 'discount') {

      if (value === '' || isNaN(newValue)) {
        handleSetDisccount(0, productId)

        return
      }

      // Solo acepta hasta 2 decimales
      if (/^\d*\.?\d{0,2}$/.test(value)) {
        handleSetDisccount(newValue, productId)
      }
    }


  }

  const selectedSimilarity = async (productId: string, warehouseId: string, similarity: Similarity) => {
    handleSelectSimilarity(productId, warehouseId, similarity)
    handleUpdateStatus('seleccionado', productId)

  }

  const headers = [
    { title: '#' },
    { title: 'Descripcion' },
    { title: 'Cant' },
    { title: 'Unidad' },
    { title: 'EAN' },
    { title: 'Costo' },
    { title: 'Precio' },
    { title: 'Utilidad' },
    { title: 'Subtotal' },
    // { title: 'Total' },
    { title: 'Estado' },
    { title: 'Acciones' },
  ]


  return (
    <div className='h-[60vh]  overflow-auto rounded-lg'>
      <table className='w-full'>
        <thead className='bg-gray-50 '>
          <tr>
            {
              headers.map(h => (
                <th key={h.title} className='px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase'>{h.title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody className='border-t-1 border-gray-200'>
          {
            quote.map((item, i) => (

              <React.Fragment key={item.id}>

                <tr className='hover:bg-gray-50 transition-colors border-t-1 border-gray-200'>

                  <td className='px-3 py-4 text-xs'>{i + 1}</td>
                  <td className='text-xs font-medium text-gray-800 px-3 py-4'>
                    <div className='flex items-center '>
                      {
                        (item.similarities && item.similarities.length > 0) &&
                        <button
                          onClick={() => toggleExpansion(item.id)}
                        >
                          {
                            productosExpandidos[item.id] ?
                              (<ChevronUp className='w-4 h-4 mr-2 text-gray-600 ' />)
                              :
                              (<ChevronDown className='w-4 h-4 mr-2 text-gray-600 ' />)
                          }
                        </button>
                      }
                      <div>
                        {item.description}
                      </div>
                    </div>
                  </td>

                  <td className='px-3 py-4 text-sm'>{item.cantidad}</td>
                  <td className='px-3 py-4 text-sm'>{item.unidad}</td>


                  {/* <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='font-mono text-gray-400 text-sm'>
                      {item.codigo}
                    </div>
                  </td> */}
                  <td className='px-3 py-4 whitespace-nowrap text-sm'>

                    {item.ean}
                  </td>

                  <td className='px-3 py-4 font-mono text-sm'> {formatCurrency(item.costoUnitario) ?? '-'}</td>

                  <td className='px-3 py-4 whitespace-nowrap '>
                    <CustomNumberInput
                      value={item.precioUnitario.toString()}
                      hadleChageValue={hadleChageValue}
                      productId={item.id} field='price'
                    />
                  </td>

                  <td className='px-3 py-4 '>

                    <UtilityInput productId={item.id} value={item.margenUtilidad} />
                  </td>

                  {/* <td className='px-3 py-4 whitespace-nowrap '>

                    <CustomNumberInput
                      value={item.descuento.toString()}
                      hadleChageValue={hadleChageValue}
                      productId={item.id}
                      field='discount'
                    />
                  </td> */}
                  <td className='px-3 py-4 whitespace-nowrap text-green-600 font-semibold text-sm'>
                    {formatCurrency(item.subtotal)}
                  </td>

                  {/* <td className='px-3 py-4 whitespace-nowrap text-green-600 font-semibold text-sm'>
                    {formatCurrency(item.total)}
                  </td> */}

                  <td className='px-3 py-4 whitespace-nowra'>

                    <BadgeStatus status={item.status} />

                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    <button
                      className={`
                        ${item.status === 'seleccionado' ? 'bg-blue-300' : 'bg-blue-600 '}
                        rounded-lg 
                        py-1
                        px-3
                        text-white 
                        flex 
                        items-center 
                        tex-sm
                        gap-2`
                      }
                      onClick={() => {
                        if (item.status !== 'seleccionado') {

                          handleFindSimilarities(item.description, item.id)
                        }
                      }}
                    // disabled={loading || item.status === 'seleccionado'}
                    >

                      {fetchingSimilarities[item.id] ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Buscando...
                        </>
                      ) : item.status === 'seleccionado' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Buscar
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-1" />
                          Buscar
                        </>
                      )}
                    </button>
                  </td>
                </tr>

                <AnimatePresence initial={false}>
                  {item.similarities && productosExpandidos[item.id] && (
                    <tr>
                      <td colSpan={headers.length} className="bg-gray-50 px-6 py-0">
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="space-y-3 py-4">
                            <h1>Productos similares encontrados {item.similarities?.length}</h1>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                              {item.similarities?.map((s) => (
                                <ExpandedRow
                                  key={s.ean}
                                  similarity={s}
                                  selectSimilarity={selectedSimilarity}
                                  productId={item.id}
                                  selected={item.selectedWarehouse}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>


              </React.Fragment>



            ))
          }
        </tbody>
      </table>
    </div>
  )
}


interface CustomNumberInputPorps {
  value: string
  hadleChageValue: (value: string, productId: string, field: 'price' | 'discount') => void
  productId: string
  field: 'price' | 'discount'
}

export const CustomNumberInput: FC<CustomNumberInputPorps> = ({ value, hadleChageValue, productId, field }) => {

  const price = formatCurrency(Number(value))
  return (
    <input
      type="text"
      inputMode="decimal"
      value={price}
      onChange={(e) => hadleChageValue(e.target.value, productId, field)}
      className='border-1 border-gray-300 rounded-md  text-sm text-gray-700 pl-2  py-1.5 w-20 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
    />

  )

}