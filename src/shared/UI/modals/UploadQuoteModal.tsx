import { FileText, Loader2, Upload, X } from "lucide-react"
import { useModal } from "../hooks/useModal"
import { useProducts } from "../../../hooks/useProducts"
import { useState, type ChangeEvent } from "react";


export const UploadQuoteModal = () => {

  const [archivo, setArchivo] = useState<File | null>(null);
  const { handleCloseModal } = useModal()
  const { handleUploadProcessQuoteFile, fetchingProducts } = useProducts()

  const uploadFile = (archivo: File | null) => {

    if (!archivo) return
    handleUploadProcessQuoteFile(archivo)

  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {

    const hasFiles = event.target.files?.length ? event.target.files[0] : undefined

    if (!hasFiles) return
    const file = hasFiles;

    const tipoPermitido = file.type === 'application/pdf' ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel';

    if (tipoPermitido) {
      setArchivo(file);
      return
    }
    setArchivo(null);

  }

  return (
    <div className='bg-black/35  inset-0 fixed flex justify-center items-center'>
      <section id='upload-file' className={`rounded-lg shadow-lg bg-white border-1 border-gray-200 w-2xl`}>
        <div className='border-b-1 border-gray-200 p-3 flex justify-between  items-center'>
          <div className='flex items-center gap-2'>
            <Upload className='size-5 text-blue-600' />
            <h2 className='text-lg font-bold'>Cargar Cotizacion</h2>
          </div>
          <button
            className='text-gray-500 hover:text-gray-800 cursor-pointer'
            onClick={() => handleCloseModal()}
          >
            <X />
          </button>
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
            onClick={() => uploadFile(archivo)}
            disabled={!archivo || fetchingProducts}
            className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {fetchingProducts ? (
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

    </div>
  )
}
