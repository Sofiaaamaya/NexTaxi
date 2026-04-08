import NexTaxiCard from '../common/cards/Cards';
import TitleComponent from '../common/TitleComponent';

export default function WhyChooseNexTaxi() {
  return (
    <section className="py-20">
      <div>
        <TitleComponent
          align="left"
          title="Why Choose NexTaxi?"
          subtitle="We provide the safest and most efficient transport experience across Lanzarote."
        />
      </div>

      <div className="grid gap-8 md:grid-cols-3 justify-center">
        <NexTaxiCard
          icon="Clock"
          title="24/7 Availability"
          description="Always there when you need us, day or night."
        />

        <NexTaxiCard
          icon="MapPinned"
          title="Local Experts"
          description="Experienced, licensed drivers who know every corner of Lanzarote."
        />

        <NexTaxiCard
          icon="Map"
          title="Island-Wide Coverage"
          description="From Arrecife Airport to Playa Blanca and beyond."
        />
      </div>
    </section>
  );
}
