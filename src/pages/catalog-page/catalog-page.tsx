import { Banner } from '../../components/banner/banner';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';

export function CatalogPage () {
  return (
    <div className="wrapper">
      <Header/>
      <Banner/>
      <Footer/>
    </div>
  );
}
