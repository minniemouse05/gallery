import Reveal from "@/components/Reveal";
import GalleryGrid, { GalleryImage } from "@/components/GalleryGrid";

const images: GalleryImage[] = [
  {
    src: "/little-things/01.png",
    alt: "Hot latte",
    title: "Hot Latte",
    description:
      "Accompanied me through so many study sessions at cafes across Boston. Even with imminent exams and numerous problem sets, a smooth sip can provide temporary reprieve, making me feel completely unhurried.",
  },
  {
    src: "/little-things/02.png",
    alt: "Matcha latte",
    title: "Matcha Latte",
    description:
      "Nothing like a refreshing sip from a drink half full of ice. Choosing a flavor can be the highlight of my day, whether I go for tried and true flavors like strawberry or a new seasonal flavor like a festive cranberry. ",
  },
  {
    src: "/little-things/03.png",
    alt: "Diet coke",
    title: "Diet Coke",
    description:
      "Better than Coke Zero. Sharing one with a friend. Inhaling the crisp carbonation. The action may be simple, but it stays with you.",
    scale: 1.15,
  },
  {
    src: "/little-things/04.png",
    alt: "Snowy jasmine",
    title: "Snowy Jasmine",
    description:
      "From a place I didn't think I would like at first. Candied pecans and light whipped cream. A floral jasmine flavor that sparks nostalgia even though there's only new memories being created.",
  },
  {
    src: "/little-things/05.png",
    alt: "Core power",
    title: "Core Power",
    description:
      "A core memory from Iceland grocery stores. A permanent fixture in my Ninja creami concotions from Dallas, TX.",
    scale: 0.8,
  },
  {
    src: "/little-things/06.png",
    alt: "Hey Tea mango boom",
    title: "Hey Tea Mango Boom",
    description: "3 big booms. BOOM BOOM BOOM",
  },
  {
    src: "/little-things/07.png",
    alt: "GT Synergy Kombucha",
    title: "GT Synergy Kombucha",
    description: "Kombucha makes me poop-a",
    scale: 0.95,
  },
  {
    src: "/little-things/08.png",
    alt: "Hojicha Latte",
    title: "Hojicha Latte",
    description:
      "A perfect roasted flavor that combines the best of coffee and matcha together. A warm hug in the crisp fall air of Boston.",
    scale: 0.75,
  },
  {
    src: "/little-things/09.png",
    alt: "Banana Pudding Latte",
    title: "Banana Pudding Latte",
    description:
      "My brain was rewired the first time I tried banana pudding. Add it to anything and everything. I'm there.",
    scale: 1.05,
  },
  {
    src: "/little-things/10.png",
    alt: "Hot water",
    title: "Hot Water",
    description: "Hot water for a very Chinese time in my life.",
    scale: 0.85,
  },
  {
    src: "/little-things/11.png",
    alt: "Avocado Smoothie",
    title: "Teado Avocado Smoothie",
    description: "30% sugar, no boba. Thank me later. ",
    scale: 1.1,
  },
  {
    src: "/little-things/12.png",
    alt: "Sparkling Ice",
    title: "Sparkling Ice",
    description:
      "My OG before I found Diet Coke. I know I can always count on you. My day one-er <3.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 md:py-24">
        {/* Gallery Grid - 3 columns x 4 rows */}
        <GalleryGrid images={images} />

        {/* Text Section */}
        <Reveal className="mt-24 sm:mt-32 md:mt-40">
          <section className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
              A million little sips to be grateful for.
            </h1>

            <div className="mt-12 flex flex-col gap-1 text-sm font-light tracking-wide text-neutral-500">
              <span>Silly Little Drinks</span>
              <span>2026</span>
              <span>Minnie Liang</span>
            </div>

            <p className="mt-10 max-w-md text-base font-light leading-relaxed text-neutral-600">
              A digitized collection of special little drinks, each carrying a
              memory, a moment, or a person that I feel grateful for.
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
