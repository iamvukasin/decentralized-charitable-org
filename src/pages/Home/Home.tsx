import { TargetCard, TargetCardsGrid } from '../../components';
import './Home.scss';

const Home = () => (
  <div className="home">
    <TargetCardsGrid>
      <TargetCard id="1" title="test" description="lorem ipsum" collected={0} goal={10} />
      <TargetCard id="2" title="test" description="lorem ipsum" collected={4} goal={3} />
      <TargetCard id="3" title="test" description="lorem ipsum" collected={1} goal={5} />
      <TargetCard id="4" title="test" description="lorem ipsum" collected={5.2} goal={4} />
      <TargetCard id="5" title="test" description="lorem ipsum" collected={7} goal={10} />
    </TargetCardsGrid>
  </div>
);

export default Home;
