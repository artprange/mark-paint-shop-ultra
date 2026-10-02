import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import AddToCart from '../../components/AddToCart'
import Error from '../../components/Error'
import Loading from '../../components/Loading'
import PageHero from '../../components/PageHero'
import ProductImages from '../../components/ProductImages'
import Stars from '../../components/Stars'
import { useProductsContext } from '../../context/productsContext/useProductsContext'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

export default function SingleProductPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext()

  useEffect(() => {
    if (id) fetchSingleProduct(id)
    // fetchSingleProduct é recriada a cada render do provider; incluí-la aqui
    // refaria a busca em loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => navigate('/'), 3000)
    // Sem o clear, o redirecionamento dispara mesmo depois de a página sair.
    return () => clearTimeout(timer)
  }, [error, navigate])

  if (error) return <Error />
  // `product` é null até a primeira busca terminar. O código anterior
  // desestruturava direto e quebrava no primeiro render, quando `loading`
  // ainda era false porque o efeito não tinha rodado.
  if (loading || !product) return <Loading />

  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          voltar para produtos
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Disponível :</span>
              {stock > 0 ? 'em estoque' : 'sem estoque'}
            </p>
            <p className="info">
              <span>SKU :</span>
              {sku}
            </p>
            <p className="info">
              <span>Marca :</span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}
