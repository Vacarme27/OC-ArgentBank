import FeatureItem from '../featureItem/featureItem';
import { features } from '../featureData/featuresData';
import './featureSection.scss'

function FeaturesSection() {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map((feature, index) => (
        <FeatureItem key={index} {...feature} />
      ))}
    </section>
  );
}

export default FeaturesSection;