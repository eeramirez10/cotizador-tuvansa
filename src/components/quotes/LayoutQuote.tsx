import type { FC } from "react";
import type { Product } from "../../services/quote/types";
import { addDaysFromToday, getCurrentDay } from "../../config/utils/date";


interface Props {
  products: Product[],
  subtotal: number
  iva: number
  total: number
}


export const LayoutQuote: FC<Props> = ({ products, subtotal, iva, total }) => {


  const productsWithCost = products.filter((product)=> product.precioUnitario > 0)
  // const items = [
  //   { id: 1, cant: 1.00, um: "PZ", descripcion: "TEE DE ACERO ROSCADA 210 KGS. DE 19 MM. ( 3/4\" 3000 LBS. )", precioUni: 91.25, descto: "", importeTotal: 91.25 },
  //   { id: 2, cant: 1.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 19 X 6 MM. ( 3/4\" X 1/4\" 6000 )", precioUni: 45.30, descto: "", importeTotal: 45.30 },
  //   { id: 3, cant: 2.00, um: "PZ", descripcion: "CODO DE ACERO ROSCADO 90° 210 KGS. DE 19 MM. ( 3/4\" 3000 LBS. )", precioUni: 68.75, descto: "", importeTotal: 137.50 },
  //   { id: 4, cant: 2.00, um: "PZ", descripcion: "CODO DE ACERO ROSCADO 45° 210 KGS. DE 19 MM. ( 3/4\" 3000 LBS. )", precioUni: 65.00, descto: "", importeTotal: 130.00 },
  //   { id: 5, cant: 2.00, um: "PZ", descripcion: "CODO DE ACERO ROSCADO 90° 210 KGS. DE 6 MM. ( 1/4\" 3000 LBS. )", precioUni: 52.50, descto: "", importeTotal: 105.00 },
  //   { id: 6, cant: 2.00, um: "PZ", descripcion: "TUERCA UNION DE ACERO ROSCADA 210 KGS. 19 MM. ( 3/4\" 3000 LBS. )", precioUni: 102.50, descto: "", importeTotal: 205.00 },
  //   { id: 7, cant: 1.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 25 X 19 MM. ( 1\" X 3/4\" 6000 )", precioUni: 47.50, descto: "", importeTotal: 47.50 },
  //   { id: 8, cant: 1.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 32 X 25 MM. ( 1 1/4\" X 1\" 6000 )", precioUni: 60.00, descto: "", importeTotal: 60.00 },
  //   { id: 9, cant: 5.00, um: "PZ", descripcion: "COPLE DE ACERO ROSCADO 210 KGS. DE 32 MM.(1 1/4\" 3000 LBS.)", precioUni: 57.50, descto: "", importeTotal: 287.50 },
  //   { id: 10, cant: 6.00, um: "PZ", descripcion: "TUERCA UNION DE ACERO ROSCADA 210 KGS. 32 MM. ( 1 1/4\" 3000 LBS. )", precioUni: 213.75, descto: "", importeTotal: 1282.50 },
  //   { id: 11, cant: 20.00, um: "PZ", descripcion: "CODO DE ACERO ROSCADO 90° 210 KGS. DE 32 MM. ( 1 1/4\" 3000 LBS. )", precioUni: 140.00, descto: "", importeTotal: 2799.99 },
  //   { id: 12, cant: 10.00, um: "PZ", descripcion: "TEE DE ACERO ROSCADA 210 KGS. DE 32 MM. ( 1 1/4\" 3000 LBS. )", precioUni: 137.50, descto: "", importeTotal: 1375.00 },
  //   { id: 13, cant: 10.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 32 X 13 MM. ( 1 1/4\" X 1/2\" 6000 )", precioUni: 138.57, descto: "", importeTotal: 1385.71 },
  //   { id: 14, cant: 10.00, um: "PZ", descripcion: "TUERCA UNION DE ACERO ROSCADA 210 KGS. 13 MM. ( 1/2\" 3000 LBS. )", precioUni: 120.74, descto: "", importeTotal: 1207.36 },
  //   { id: 15, cant: 10.00, um: "PZ", descripcion: "TEE DE ACERO ROSCADA 210 KGS. DE 13 MM. ( 1/2\" 3000 LBS. )", precioUni: 75.00, descto: "", importeTotal: 750.00 },
  //   { id: 16, cant: 10.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 13 X 6 MM. ( 1/2\" X 1/4\" 6000 )", precioUni: 42.86, descto: "", importeTotal: 428.58 },
  //   { id: 17, cant: 10.00, um: "PZ", descripcion: "CODO DE HIERRO MALEABLE10.5 KGS.DE 6 MM. X 90° GALV. ( 1/4\" X 90° 150 LBS. )", precioUni: 11.01, descto: "", importeTotal: 110.07 },
  //   { id: 18, cant: 51.20, um: "M", descripcion: "TUBO DE ACERO AL CARBON SIN COSTURA DE 21.3 X 3.7 MM. ( 1/2\" CED. 80 )", precioUni: 130.59, descto: "", importeTotal: 6686.05 },
  //   { id: 19, cant: 12.80, um: "M", descripcion: "TUBO DE ACERO AL CARBON SIN COSTURA DE 26.7 X 3.9 MM. ( 3/4\" CED. 80 )", precioUni: 151.19, descto: "", importeTotal: 1935.23 },
  //   { id: 20, cant: 89.60, um: "M", descripcion: "TUBO DE ACERO AL CARBON SIN COSTURA DE 42.2 X 4.9 MM. ( 1 1/4\" CED. 80 )", precioUni: 260.02, descto: "", importeTotal: 23297.86 },
  //   { id: 21, cant: 1.00, um: "PZ", descripcion: "TAPON MACHO DE ACERO ROSCADO 420 KGS. 51 MM. ( 2\" 6000 LBS. )", precioUni: 173.35, descto: "", importeTotal: 173.35 },
  //   { id: 22, cant: 10.00, um: "PZ", descripcion: "COPLE DE HIERRO MALEABLE 10.5 KGS. DE 13 MM. GALVANIZADO ( 1/2\" 150 LBS. )", precioUni: 9.14, descto: "", importeTotal: 91.35 },
  //   { id: 23, cant: 10.00, um: "PZ", descripcion: "REDUCCION BUSHING DE ACERO 420 KGS. DE 13 X 6 MM. ( 1/2\" X 1/4\" 6000 )", precioUni: 20.57, descto: "", importeTotal: 205.71 }
  // ];

  const currentDate = getCurrentDay()
  const vigencia = addDaysFromToday(5)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="w-screen mx-auto p-6 bg-white font-sans text-sm">
      {/* Header */}
      <div className="border-2 border-black mb-4">
        <div className="bg-gray-100 p-2 border-b border-black">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg">COTIZACIÓN</p>
              <p>Fecha: {currentDate}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">XCXXXXXXX</p>
              <p>Teléfono: (XX) XX XX XX XX</p>
              <p className="text-blue-600">www.tuvansa.com.mx</p>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Direccion</strong></p>
              <p>R.F.C. TVN820506NT0</p>
              {/* <p>CD. INDUSTRIAL BRUNO PAGLIAI VERACRUZ, VER.</p> */}
            </div>
            <div>
              <p>Fecha Cotización: {currentDate}</p>
              <p>Cliente: 003821</p>
              <p>Tipo de Cambio: 18.72000000</p>
              <p>AGENTE: XXXXXXXX</p>
              <p>Vigencia de Cotización:{vigencia}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cliente Info */}
      <div className="border border-black mb-4 p-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>GAS DEL ATLANTICO, SA DE CV SUC.</strong></p>
            <p>LAS PALMAS LOTE 12 13 14 COL. BRUNO PAGLIAI</p>
            <p>DELEG. VERACRUZ, VERACRUZ, VERACRUZ</p>
            <p>TELS. operaciones_veracruz@ FAX gasdelatlantico.mx</p>
            <p>R.F.C: GAT960911GI5</p>
            <p>E-MAIL: compras@gasdelatlantico.mx</p>
            <p>CONTACTO: j.cesar.contreras@ho</p>
          </div>
          <div>
            <p><strong>PLAZO: 0 DIAS</strong></p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="border border-black mb-4 text-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-black">
              <th className="border-r border-black p-2 text-left w-8">#</th>
              <th className="border-r border-black p-2 text-left w-16">CANT</th>
              <th className="border-r border-black p-2 text-left w-12">UM</th>
              <th className="border-r border-black p-2 text-left">DESCRIPCIÓN</th>
              <th className="border-r border-black p-2 text-right w-24">PRECIO UNI</th>
              <th className="border-r border-black p-2 text-center w-16">DESCTO</th>
              <th className="p-2 text-right w-28">IMPORTE TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {productsWithCost.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-r border-gray-300 p-2 text-center">{index + 1}</td>
                <td className="border-r border-gray-300 p-2 text-right">{formatNumber(item.cantidad)}</td>
                <td className="border-r border-gray-300 p-2 text-center">{item.unidad}</td>
                <td className="border-r border-gray-300 p-2">{item.description}</td>
                <td className="border-r border-gray-300 p-2 text-right">{formatNumber(item.precioUnitario)}</td>
                <td className="border-r border-gray-300 p-2 text-center">{item.descuento}</td>
                <td className="p-2 text-right">{formatNumber(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="mb-4">
        <p><strong>Entregar en:</strong></p>
        <p>L.A.B. VERACRUZ CONTADO T.E. ES DE 3 DIAS HABILES MAT. SUJETO A VENTA</p>
      </div>

      {/* Totals */}
      <div className="border border-black">
        <div className="bg-gray-100 p-3">
          <div className="flex justify-end">
            <div className="w-80">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-right font-bold">SUB-TOTAL</div>
                <div className="text-right">{formatCurrency(subtotal)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="text-right font-bold">IVA 16%</div>
                <div className="text-right">{formatCurrency(iva)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-2">
                <div className="text-right font-bold text-lg">TOTAL</div>
                <div className="text-right font-bold text-lg">{formatCurrency(total)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-6 text-center">
        <p className="mb-4"><strong>ATENTAMENTE</strong></p>
        <div className="border-t border-black w-64 mx-auto mb-2"></div>
        <p><strong>TF-VT-01</strong></p>
        <p><strong>Nombre Agente</strong></p>
        <p className="mt-4 text-xs"><strong>PRECIOS SUJETOS A CAMBIO SIN PREVIO AVISO</strong></p>
      </div>
    </div>
  );
};
