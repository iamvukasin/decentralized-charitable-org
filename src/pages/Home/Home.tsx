import { TargetCard, TargetCardsGrid } from '../../components';
import './Home.scss';

const Home = () => (
  <div className="home">
    <div className="home__content">
      <TargetCardsGrid>
        <TargetCard title="test" description="lorem ipsum" />
        <TargetCard title="test" description="lorem ipsum" />
        <TargetCard title="test" description="lorem ipsum" />
        <TargetCard title="test" description="lorem ipsum" />
        <TargetCard title="test" description="lorem ipsum" />
      </TargetCardsGrid>
    </div>
  </div>
);

export default Home;
