import { getRouteApi, Link } from '@tanstack/react-router'

import AddToCart from '../../components/AddToCart'
import PageHero from '../../components/PageHero'
import ProductImages from '../../components/ProductImages'
import Stars from '../../components/Stars'
import { formatPrice } from '../../utils/helpers'
import { Wrapper } from './styles'

const route = getRouteApi('/products/$id')

export default function SingleProductPage() {

  const product = route.useLoaderData()

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
