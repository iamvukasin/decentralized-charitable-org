import { Loading, TargetCard, TargetCardsGrid } from '../../components';
import { useTargets } from '../../hooks';
import './Home.scss';

const Home = () => {
  const targets = useTargets();

  return (
    <div className="home">
      {targets === null && (
        <div className="home__loading-container">
          <Loading size="large" />
        </div>
      )}
      {targets !== null && (
        <div className="home__targets-grid">
          <TargetCardsGrid>
            {targets.map(target => (
              <TargetCard
                id={target.id}
                title={target.title}
                description={target.description}
                collected={target.collected}
                goal={target.goal}
              />
            ))}
          </TargetCardsGrid>
        </div>
      )}
    </div>
  );
};

export default Home;
