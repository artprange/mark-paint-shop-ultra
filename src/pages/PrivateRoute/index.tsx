import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import Loading from '../../components/Loading'
import { useUserContext } from '../../context/userContext'

type PrivateRouteProps = {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { myUser, isLoading } = useUserContext()

  // Sem esta checagem, o Auth0 ainda restaurando a sessão conta como
  // "não logado" e a rota redireciona para a home num piscar de olhos.
  if (isLoading) return <Loading />
  if (!myUser) return <Navigate to="/" replace />

  return <>{children}</>
}
