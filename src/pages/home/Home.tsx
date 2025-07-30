import { useEffect, useRef, useState, type ChangeEvent } from 'react'

import { Upload, FileText, Loader2, Filter, } from 'lucide-react';
import { TableQuotes, } from '../../components/TableQuotes';
import { uploadFile } from '../../services/quote/api';
import type { Status } from '../../components/BadgeStatus';
import type { Product, Similarity } from '../../services/quote/types';
import { formatCurrency } from '../../config/utils/format';
import { PrintButton } from '../../components/quotes/PrintButton';
import { PrintableLayout } from '../../components/quotes/PrintableLayout';

export const Home = () => {


  const printRef = useRef<HTMLDivElement >(null)

  const [productos, setProductos] = useState<Product[]>([]);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [cargando, setCargando] = useState(false);
  // const [mensaje, setMensaje] = useState('');
  // const [tipoMensaje, setTipoMensaje] = useState('');
  // const [filtro, setFiltro] = useState('todos');
  const [uploaded, setUploaded] = useState(false)


  const saveProductsToLocalStorage = (products: Product[]) => {

    localStorage.setItem('productos', JSON.stringify(products))
  }

  // const clearProductsLocalStorage = () => {
  //   localStorage.removeItem('productos')
  // }


  useEffect(() => {

    const productosLocalStorage = localStorage.getItem('productos')
    if (productosLocalStorage) {

      const productos = JSON.parse(productosLocalStorage)
      setProductos([...productos])
    }
  }, [])


  useEffect(() => {
    saveProductsToLocalStorage([...productos])
  }, [productos])


  const subTotal = productos.reduce((acum, current) => acum + current.total, 0)
  const iva = (subTotal * 0.16)
  const total = subTotal + iva


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

    const hasFiles = event.target.files?.length ? event.target.files[0] : undefined

    if (!hasFiles) return
    const file = hasFiles;

    const tipoPermitido = file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';

    if (tipoPermitido) {
      setArchivo(file);
      // setMensaje(`Archivo seleccionado: ${file.name}`);
      // setTipoMensaje('info');

      return
    }
    // setMensaje('Por favor selecciona un archivo Excel (.xlsx, .xls) o PDF');
    // setTipoMensaje('error');
    setArchivo(null);

  }


  const selectSimilarity = (productId: string, warehouseId: string, similarity: Similarity) => {



    // const selectedWarehouse = productos.map((product) => {

    //   if (product.id === productId) {

    //     if (product.similarities.)

    //   }

    //   return product
    // })


    setProductos((prev) => {

      return prev.map((producto) => {

        if (producto.id === productId) {

          const similarityArr = producto.similarities
          const findSimilarity = similarityArr?.find((s) => s.warehouses?.find((w) => w.id === warehouseId))

          const findWarehouse = findSimilarity?.warehouses?.find((w) => w.id === warehouseId)

          return {
            ...producto,
            ean: findSimilarity?.ean ?? '',
            estado: "seleccionado",
            selected: similarity,
            selectedWarehouse: findWarehouse,
            costoUnitario: findWarehouse?.cost ?? 0

          }
        }


        return producto

      })
    })

  }

  const handlesSetPriceTotal = (price: number, productId: string) => {



    setProductos(prev => prev.map((product) =>
      product.id === productId ? ({
        ...product,
        precioUnitario: price,
        total: price * product.cantidad
      }) :
        product)
    )


  }

  const handleSetDisccount = (discount: number, productId: string) => {

    const discountProduct = (producs: Product[]) => {

      return producs.map((product) => {

        const descuento = discount || 0;

        if (product.id === productId) {

          const subtotal = product.precioUnitario * product.cantidad;
          const descuentoMonto = subtotal * (descuento / 100);
          const total = subtotal - descuentoMonto;

          return {
            ...product,
            descuento: discount,
            total

          }
        }

        return product
      })
    }

    setProductos(discountProduct)

  }

  const setStatusProduct = (status: Status, productId: string) => {

    setProductos(prev => prev.map((product) =>
      product.id === productId ? ({
        ...product,
        status
      }) :
        product)
    )
  }

  const handleSetSimilarities = (similarities: Similarity[], productId: string) => {

    setProductos(
      prev => prev.map((product) => product.id === productId ?
        (
          {
            ...product,
            similarities
          }
        )
        :
        product
      )
    )
  }

  const procesarCotizacion = async () => {


    if (!archivo) {
      // setMensaje('Seleccione un archivo primero')
      // setTipoMensaje('error')
      return
    }

    setCargando(true)
    // setMensaje('Procesando cotizacion')
    // setTipoMensaje('Info')
    try {

      const resp = await uploadFile(archivo, 'quote')

      const productos = resp.quotation.map<Product>((q) => ({
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

      setProductos([...productos])

      // localStorage.setItem('productos', JSON.stringify(productos))

      saveProductsToLocalStorage(productos)

      setUploaded(true)


    } catch (error) {
      console.log(error)
    } finally {
      setCargando(false)
      setArchivo(null)
    }

  }

  // const handleAddWarehouses = (warehouses: Warehouse[], productId: string, similarityId: string) => {

  //   const addWarehouses = (products: Product[]): Product[] => {

  //     return products.map((producto: Product) => {

  //       if (producto.id === productId) {

  //         producto.similarities?.map((simi: Similarity) => {

  //           return simi.id === similarityId ?
  //             {
  //               ...simi,
  //               warehouses: [...warehouses]
  //             }
  //             : simi
  //         })

  //       }

  //       return producto
  //     })

  //   }

  //   setProductos(addWarehouses)
  // }




  return (
    <div className=' '>

      <section id='header' className='rounded-sm  bg-white/98 shadow-md flex py-4 px-20 justify-between fixed w-screen top-0 ' >

        <div>
          <h2 className='text-2xl font-bold text-gray-900'>Sistema de Cotizaciones</h2>
          <p className='text-sm text-gray-500'>Gestiona cotizaciones con busqueda inteligente por Inteligencia artificial en proscai</p>

        </div>

        <div className='flex justify-center items-center gap-2'>
          <button className={`
            ${archivo !== null ? 'hidden' : ''}
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
              setArchivo(null)
              setUploaded(false)
              setProductos([])
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

      </section>

      {
        (productos.length === 0) &&
        <section id='upload-file' className={`${uploaded ? 'hidden' : ''}  rounded-lg  shadow-lg bg-white border-1 border-gray-200 max-w-7xl m-auto mt-30 `}>
          <div className='border-b-1 border-gray-200 p-3 flex items-center gap-3'>
            <Upload className='size-5 text-blue-600' />
            <h2 className='text-lg font-bold'>Cargar Cotizacion</h2>
          </div>
          <div className='p-5 '>
            <h3 className='text-gray-900 text-sm mb-2'>Archivo de cotizacion</h3>
            <div className='border-2 p-4 border-dashed border-gray-300 rounded-lg text-center'>
              <FileText className='m-auto size-12 text-gray-400' />

              <div className='flex justify-center text-gray-700'>
                <label className='text-md '>
                  <span className='text-blue-600 cursor-pointer'>Seleccionar archivo</span>
                  <input type="file" accept='.xlsx,.xls,.pdf' className='sr-only' onChange={handleFileChange} />

                </label>
                <p className='ml-1'>o arrastre y suelta</p>
              </div>

              <p className='text-sm text-gray-500'>Excel (.xlsx, .xls) o PDF hasta 10MB</p>
            </div>

            {
              archivo &&


              <div className='bg-blue-200 p-2 rounded-md  mt-3 '>
                <p className='text-blue-700 font-semibold text-sm'>Archivo seleccionado: {archivo.name}</p>
              </div>

            }


            <button
              onClick={() => procesarCotizacion()}
              disabled={!archivo || cargando}
              className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {cargando ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Procesar Cotización
                </>
              )}
            </button>
          </div>

        </section>

      }




      {
        productos.length > 0 &&
        <section id='table' className='bg-white  mx-5 rounded-lg shadow-md mx-aut  border-1 border-gray-200 m-auto mt-30'>

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

          <TableQuotes
            quote={productos}
            handleSetSimilarities={handleSetSimilarities}
            setStatusProduct={setStatusProduct}
            selectSimilarity={selectSimilarity}
            handlesSetPriceTotal={handlesSetPriceTotal}
            handleSetDisccount={handleSetDisccount}
          />



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




      <PrintableLayout printRef={printRef} products={productos} subtotal={subTotal} total={total} iva={iva} />

    </div>
  )
}
