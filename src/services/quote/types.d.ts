export interface Similarity {
  id: string
  score: number
  description: string
  ean: string
  warehouses?: Warehouse[]
}

export interface Warehouse {
  id: string
  name: string
  cost: number
  stock: string
}


export interface Product  {
  id: string
  description: string
  cantidad: number
  unidad: string

  codigo: string
  ean: string
  status: Status
  similarities?: Similarity[]
  selected?: Similarity
  selectedWarehouse?: Warehouse
  precioUnitario: number,
  costoUnitario: number,
  descuento: number,
  subtotal: number,
  total: number

}


export interface Quotation {
  id: string
  description: string
  cantidad: number
  unidad: string
}


interface FileResponse {
  quotation: Quotation[]
}

interface Metadata {
  description: string
  ean: string
}

export interface SimilaritiesResponse {
  id: string,
  score: number,
  values: number[],
  metadata: Metadata
}
