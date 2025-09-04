import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/useStore'
import { updateMargenUtilidad } from '../store/slices/ productSlice'

type UtilidadInputProps = {
  productId: string
  value?: number // margen actual (en %) que viene del store
}

// const PRESETS = [10, 20, 30, 40, 50]

export const UtilityInput = ({ productId, value = 10 }: UtilidadInputProps) => {
  const dispatch = useAppDispatch()
  const [local, setLocal] = useState<string>(String(value))

  useEffect(() => {
    setLocal(String(value ?? 0))
  }, [value])

  const clamp = (n: number, min = 0, max = 100) => Math.min(Math.max(n, min), max)

  const commit = (margen: number) => {
    const normalized = clamp(Math.round(margen * 100) / 100) // 2 decimales
    dispatch(updateMargenUtilidad({ id: productId, margenUtilidad: normalized }))
    setLocal(String(normalized))
  }

  // Slider cambia en pasos de 10, 10→50
  // const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const v = Number(e.target.value)
  //   commit(v)
  // }

  // Input manual: permite escribir, valida al salir de foco / Enter
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d.,-]/g, '').replace(',', '.')
    setLocal(raw)
  }

  const onInputBlur = () => {
    const n = Number(local)
    if (Number.isFinite(n)) commit(n)
    else setLocal(String(value ?? 0))
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const n = Number(local)
      if (Number.isFinite(n)) commit(n)
    }
    if (e.key === 'ArrowUp') {
      const n = Number(local)
      commit((Number.isFinite(n) ? n : value) + 10)
    }
    if (e.key === 'ArrowDown') {
      const n = Number(local)
      commit((Number.isFinite(n) ? n : value) - 10)
    }
  }

  return (
    <div className="space-y-2 flex items-center justify-center">
      {/* Presets 10–50 */}
      {/* <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button
            key={p}
            type="button"
            onClick={() => commit(p)}
            className={`px-2.5 py-1 rounded-md text-sm border transition
              ${Number(local) === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            {p}%
          </button>
        ))}
      </div> */}

      {/* Slider 10–50 (paso 10) */}
      {/* <input
        type="range"
        min={10}
        max={50}
        step={10}
        value={Math.min(Math.max(Number(local) || 10, 10), 50)}
        onChange={onSliderChange}
        className="w-full"
        aria-label="Margen de utilidad (slider)"
      /> */}

      {/* Input manual */}
      <div>
        <div className="flex items-center gap-2">
          <input
            inputMode="decimal"
            value={local}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onKeyDown={onInputKeyDown}
            className="w-24 px-3 py-1.5 rounded-lg border border-gray-300 text-sm"
            aria-label="Margen de utilidad (%)"
            placeholder="10"
          />
          <span className="text-sm text-gray-600">%</span>
        </div>
        {/* <p className="text-[11px] text-gray-500">
          Tip: usa ↑ / ↓ para ajustar en saltos de 10%.
        </p> */}
      </div>

    </div>
  )
}
