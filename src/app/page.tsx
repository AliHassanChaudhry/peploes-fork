import { BookingBanner } from "@/components/app/compounds/booking-banner";
import { GroupsOccasions } from "@/components/app/compounds/groups-occasions";
import { Hero } from "@/components/app/compounds/hero";
import { HumanHospitality } from "@/components/app/compounds/human-hospitality";
import { Menus } from "@/components/app/compounds/menus";
import { RestaurantFeatures } from "@/components/app/compounds/restaurant-features";
import { Stories } from "@/components/app/compounds/stories";
import { WhatsOn } from "@/components/app/compounds/whats-on";
import { Wine } from "@/components/app/compounds/wine";
import { whatsOnEvents } from "@/lib/constants/whats-on";

export default function Home() {
  return (
    <main>
      <Hero />
      <RestaurantFeatures />
      <Menus />
      <WhatsOn events={whatsOnEvents} />
      <Wine />
      <Stories />
      <GroupsOccasions />
      <HumanHospitality />
      <BookingBanner />
    </main>
  );
}
