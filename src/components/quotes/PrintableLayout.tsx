import React from "react";
import { LayoutQuote } from "./LayoutQuote";
import type { Product } from "../../services/quote/types";

interface PrintableLayoutProps {
  printRef: React.RefObject<HTMLDivElement | null>;
  products: Product[];
  subtotal: number
  iva: number
  total: number
}

export const PrintableLayout: React.FC<PrintableLayoutProps> = ({ printRef, products, subtotal, total, iva }) => (

  

  <div ref={printRef} className="layout-cotizacion-imprimir">
    <LayoutQuote products={products} subtotal={subtotal} iva={iva} total={total} />
  </div>
);
