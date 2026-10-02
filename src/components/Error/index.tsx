import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="section section-center text-center">
      <h2>Houve um erro...</h2>
      <Link to="/" className="btn">
        voltar para a home
      </Link>
    </div>
  )
}
