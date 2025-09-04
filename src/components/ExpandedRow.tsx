import type { FC } from "react"
import { Star } from "lucide-react"
import { formatCurrency } from "../config/utils/format"
import type { Similarity, Warehouse } from "../services/quote/types"

interface Props {
  similarity: Similarity
  selectSimilarity: (productId: string, warehouseId: string, similarity: Similarity) => void
  productId: string
  selected?: Warehouse
}


export const ExpandedRow: FC<Props> = ({ similarity, selectSimilarity, productId, selected }) => {

  const { score, description, ean } = similarity

  // <div className={`border-1 ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'} p-3.5 rounded-lg `}>


  return (
    <div className={`border-1 border-gray-200 hover:border-gray-300 p-3.5 rounded-lg shadow-md `}>
      <div className='flex justify-between border-b-1 border-gray-300'>
        <div>
          <div className='flex gap-2 mb-1'>
            <h4 className='text-gray-800 text-sm font-bold'> {ean}</h4>
            <div className='flex justify-center items-center'>
              <Star className='w-4 h-4  text-yellow-400 mr-1' />
              <p className='text-gray-800 text-sm'>{(score * 100).toFixed(2)} %</p>
            </div>
          </div>
          <h2 className='text-sm font-semibold text-gray-800 mb-2'>{description}</h2>
          {/* <p className='text-xs text-gray-700 font-medium'>EAN: {ean}</p> */}

        </div>


        {/* <div>
          <button className=' bg-green-600 p-1.5 rounded-lg mr-2 ' onClick={() => selectSimilarity(productId, similarity)}>
            <Check className='text-white h-5 w-4' />
          </button>
          <button className=' bg-red-600 p-1.5 rounded-lg'>
            <X className='text-white h-5 w-4' />
          </button>
        </div> */}

      </div>

      <div className="my-3  ">
        <h4 className="text-gray-800 text-xs font-semibold ">Disponibilidad por sucursal:</h4>

        <div className="grid grid-cols-1 gap-3 ">


          <table className="text-xs text-left  rounded-md shadow-md">
            <thead className="bg-gray-100">
              <tr className="text-xs uppercase">
                <th className="px-6 py-3">Almacen</th>
                <th className="px-6 py-3">Costo</th>
                <th className="px-6 py-3">Stock</th>
              </tr>
            </thead>
            <tbody>

              {
                similarity.warehouses?.map(({ name, cost, stock, id }) => (
                  <tr
                    key={id}
                    className={` border-b-1 border-gray-200 cursor-pointer hover:bg-gray-100 ${selected?.id === id ? 'bg-green-100' : ''}`}
                    onClick={() => selectSimilarity(productId, id, similarity)}
                  >
                    <td className="px-6 py-3">{name}</td>
                    <td className="px-6 py-3 text-green-700 font-semibold">{formatCurrency(cost)}</td>
                    <td className="px-6 py-3 text-blue-700 font-semibold ">{stock}</td>
                  </tr>
                ))
              }

            </tbody>

          </table>




          {
            // similarity.warehouses?.map((warehouse) => (


            //   <div
            //     key={`${warehouse.id}`}
            //     onClick={() => selectSimilarity(productId, warehouse.id, similarity)}
            //   >

            //     <ListBranchDetails branch={warehouse} />

            //     {/* <BranchDetails
            //       branch={warehouse}
            //     /> */}
            //   </div>





            // ))
          }

          {/* 
          <div className="border-1 border-gray-300 rounded-md p-2">
            <p className="text-gray-700 font-semibold text-xs mb-2" >Mexico</p>
            <div className="flex justify-between ">
              <div className="text-gray-600 text-xs">
                <p>Costo:</p>
                <p>Stock:</p>
              </div>
              <div className="text-xs ">
                <p className="text-green-700 font-semibold">$12.50</p>
                <p className=" text-blue-700 font-semibold ">650</p>
              </div>
            </div>
          </div>

          <div className="border-1 border-gray-300 rounded-md p-2">
            <p className="text-gray-700 font-semibold text-xs mb-2" >Mexico</p>
            <div className="flex justify-between ">
              <div className="text-gray-600 text-xs">
                <p>Costo:</p>
                <p>Stock:</p>
              </div>
              <div className="text-xs ">
                <p className="text-green-700 font-semibold">$12.50</p>
                <p className=" text-blue-700 font-semibold ">650</p>
              </div>
            </div>
          </div>

          <div className="border-1 border-gray-300 rounded-md p-2">
            <p className="text-gray-700 font-semibold text-xs mb-2" >Mexico</p>
            <div className="flex justify-between ">
              <div className="text-gray-600 text-xs">
                <p>Costo:</p>
                <p>Stock:</p>
              </div>
              <div className="text-xs ">
                <p className="text-green-700 font-semibold">$12.50</p>
                <p className=" text-blue-700 font-semibold ">650</p>
              </div>
            </div>
          </div>

          <div className="border-1 border-gray-300 rounded-md p-2">
            <p className="text-gray-700 font-semibold text-xs mb-2" >Mexico</p>
            <div className="flex justify-between ">
              <div className="text-gray-600 text-xs">
                <p>Costo:</p>
                <p>Stock:</p>
              </div>
              <div className="text-xs ">
                <p className="text-green-700 font-semibold">$12.50</p>
                <p className=" text-blue-700 font-semibold ">650</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>




    </div>
  )
}


interface BranchDetailProps {

  branch: Warehouse

}


// export const ListBranchDetails: FC<BranchDetailProps> = ({ branch, ...rest }) => {
//   const { name, cost, stock } = branch

//   const formatCost = formatCurrency(cost)


//   return (
//     <table className="w-full text-sm text-left ">
//       <thead className="bg-gray-100">
//         <tr className="text-xs uppercase">
//           <th className="px-6 py-3">Almacen</th>
//           <th className="px-6 py-3">Costo</th>
//           <th className="px-6 py-3">Stock</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td className="px-6 py-3">{name}</td>
//           <td className="px-6 py-3">{formatCost}</td>
//           <td className="px-6 py-3">{stock}</td>
//         </tr>
//       </tbody>

//     </table>
//   )
// }


export const BranchDetails: FC<BranchDetailProps> = ({ branch, ...rest }) => {

  const { name, cost, stock } = branch

  const formatCost = formatCurrency(cost)

  return (

    <div
      {...rest}
      className="border-1 border-gray-300 rounded-md p-2 cursor-pointer"
    >
      <p className="text-gray-700 font-semibold text-xs mb-2" >{name}</p>
      <div className="flex justify-between ">
        <div className="text-gray-600 text-xs">
          <p>Costo:</p>
          <p>Stock:</p>
        </div>
        <div className="text-xs ">
          <p className="text-green-700 font-semibold">{formatCost}</p>
          <p className=" text-blue-700 font-semibold ">{stock}</p>
        </div>
      </div>
    </div>

  )

}