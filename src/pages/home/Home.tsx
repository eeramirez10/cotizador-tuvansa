import { useRef } from 'react'
import { Upload, Filter, } from 'lucide-react';
import { TableQuotes, } from '../../components/TableQuotes';
import { formatCurrency } from '../../config/utils/format';
import { PrintButton } from '../../components/quotes/PrintButton';
import { PrintableLayout } from '../../components/quotes/PrintableLayout';
import { useProducts } from '../../hooks/useProducts';
import { UploadQuoteModal } from '../../shared/UI/modals/uploadQuoteModal';
import { useModal } from '../../shared/UI/hooks/useModal';

export const Home = () => {


  const printRef = useRef<HTMLDivElement>(null)

  const { products } = useProducts()
  const { modal, handleOpenModal } = useModal()



  const subTotal = products.reduce((acum, current) => acum + current.total, 0)
  const iva = (subTotal * 0.16)
  const total = subTotal + iva


  return (
    <div>

      <section id='header' className='rounded-sm  bg-white/50 backdrop-blur-lg shadow-md flex py-4 px-20 justify-between flex-wrap fixed w-screen top-0 z-50 ' >
        <div>
          <img src="/tuvansa-logo.png" alt="" />
        </div>
        <div>
          <h2 className='text-2xl font-bold text-gray-700'>Sistema de Cotizaciones</h2>
          <p className='text-sm text-gray-500'>Gestiona cotizaciones con busqueda inteligente por Inteligencia artificial en proscai</p>

        </div>

      </section>

      <div className='md:mx-5 lg:mx-15'>
        <div className='mt-30 flex justify-end'>
          <div className='flex justify-center items-center gap-2'>
            <button className={`
          
          text-white 
            flex
            font-bold 
            items-center 
            px-4 
            py-2 
            border 
            border-yellow-300 
            rounded-lg 
            text-sm   
            bg-yellow-300 
            hover:bg-yellow-400 
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500 
            focus:ring-offset-2
          `}
              onClick={() => {

                handleOpenModal()
              }}
            >
              <Upload className='w-4 h-4 mr-2' />
              Subir Cotizacion
            </button>



            <PrintButton ref={printRef} />

            {/* <button className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
            <Upload className='w-4 h-4 mr-2' />
            Exportar
          </button> */}

          </div>


        </div>




        {
          products.length > 0 &&
          <section id='table' className='bg-white   rounded-lg shadow-md  border-1 border-gray-200 mt-10 '>

            <div className='border-t-1 border-gray-200 p-4'>

              <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold text-gray-800'>Productos de la Cotizacion</h1>
                <div className='flex gap-5 items-center '>
                  <Filter className='w-5 text-gray-400' />
                  <select name="" id="" className='border-1 border-gray-300 rounded-lg p-2 text-sm'>
                    <option value="">Todos los productos</option>
                  </select>
                </div>
              </div>

            </div>

            <TableQuotes />

            <div className='bg-white rounded-b-md p-3 mt-5 shadow-md flex justify-between border-t-1 border-gray-300'>

              <div>

              </div>
              <div className='text-gray-700 border-1 border-gray-300 p-2 rounded-md'>

                <div className='flex gap-2 justify-between'>
                  <p className='font-semibold'>Sub Total:</p>  <p className='font-mono'>{formatCurrency(subTotal)}</p>
                </div>
                <div className='flex gap-2 justify-between'>
                  <p className='font-semibold'>IVA 16%:</p> <p className='font-mono'>{formatCurrency(iva)}</p>
                </div>
                <div className='flex gap-2 justify-between'>
                  <p className='font-semibold '>Total:</p> <p className='font-mono'>{formatCurrency(total)}</p>
                </div>

              </div>
            </div>
          </section>
        }
      </div>




      <PrintableLayout
        printRef={printRef}
        products={products}
        subtotal={subTotal}
        total={total}
        iva={iva}
      />

      {
        modal.isOpen &&
        <UploadQuoteModal />

      }

    </div>
  )
}
