import Filters from '../../components/Filters'
import PageHero from '../../components/PageHero'
import ProductList from '../../components/ProductList'
import Sort from '../../components/Sort'
import { Wrapper } from './styles'

export default function ProductsPage() {
  return (
    <main>
      <PageHero title="produtos" />
      <Wrapper className="page">
        <div className="section-center products">
          <Filters />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}
