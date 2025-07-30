import { type FC } from 'react'


export type Status = 'pendiente' | 'buscando' | 'seleccionado' | 'candidatos' | 'rechazado' | 'error'

interface Props {
  status: Status,
}

export const BadgeStatus: FC<Props> = ({ status }) => {

  const estilos: Record<Status, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    buscando: 'bg-blue-100 text-blue-800 border-blue-200',
    candidatos: 'bg-purple-100 text-purple-800 border-purple-200',
    seleccionado: 'bg-green-100 text-green-800 border-green-200',
    rechazado: 'bg-red-100 text-red-800 border-red-200',
    error: 'bg-red-100 text-red-800 border-red-200'
  };

  const textos: Record<Status, string> = {
    pendiente: 'Pendiente',
    buscando: 'Buscando...',
    candidatos: 'Candidatos',
    seleccionado: 'Seleccionado',
    rechazado: 'Rechazado',
    error:'Error al buscar'
  };
  return (
    <span className={`${estilos[status]} border-1 font-medium text-xs px-2 py-1 rounded-full`}>
      {textos[status]}
    </span>
  )
}
