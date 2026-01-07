import Reveal from "@/components/Reveal";
import GalleryGrid, { GalleryImage } from "@/components/GalleryGrid";

const images: GalleryImage[] = [
  {
    src: "/little-things/01.png",
    alt: "A pressed flower from a spring walk",
    title: "Pressed Flower",
    description:
      "Found on a slow morning walk last April. The light was soft and golden, and I remember feeling, for once, completely unhurried.",
  },
  {
    src: "/little-things/02.png",
    alt: "Vintage postage stamp",
    title: "Postage Stamp",
    description:
      "From a letter my grandmother sent years ago. She always used the prettiest stamps, as if the envelope itself was part of the gift.",
  },
  {
    src: "/little-things/03.png",
    alt: "Handwritten note on torn paper",
    title: "Handwritten Note",
    description:
      "A scribbled reminder from a friend, left on my desk when I needed it most. The words were simple, but they stayed with me.",
    scale: 1.05,
  },
  {
    src: "/little-things/04.png",
    alt: "Old photograph corner",
    title: "Photograph Corner",
    description:
      "Torn from an album I found at a flea market. I don't know the people in it, but their joy felt familiar somehow.",
  },
  {
    src: "/little-things/05.png",
    alt: "Dried leaf with delicate veins",
    title: "Autumn Leaf",
    description:
      "Picked up on the first cold day of fall. I was walking alone, thinking about change, and this leaf felt like a quiet answer.",
    scale: .8,
  },
  {
    src: "/little-things/06.png",
    alt: "Ticket stub from a memorable night",
    title: "Ticket Stub",
    description:
      "From a show I almost didn't go to. I'm grateful I said yes that night—it changed the way I think about spontaneity.",
    scale: .95,
  },
  {
    src: "/little-things/07.png",
    alt: "Washi tape fragment",
    title: "Washi Tape",
    description:
      "A scrap left over from wrapping a birthday gift. The person I gave it to made me feel seen in a way I hadn't expected.",
  },
  {
    src: "/little-things/08.png",
    alt: "Pressed clover",
    title: "Four-Leaf Clover",
    description:
      "My niece found this and handed it to me with such seriousness. 'For your luck,' she said. I've kept it ever since.",
    scale: .75,
  },
  {
    src: "/little-things/09.png",
    alt: "Vintage button",
    title: "Old Button",
    description:
      "Fell off my mother's coat when I was small. I kept it in my pocket for weeks, a tiny piece of her warmth.",
    scale: 1.05,
  },
  {
    src: "/little-things/10.png",
    alt: "Ribbon scrap",
    title: "Ribbon",
    description:
      "Saved from a package that arrived on a hard day. The gift inside mattered less than knowing someone thought of me.",
  },
  {
    src: "/little-things/11.png",
    alt: "Seashell from the coast",
    title: "Seashell",
    description:
      "Collected on a trip where nothing went as planned—and everything turned out better for it. The ocean has a way of resetting things.",
    scale: 1.1,
  },
  {
    src: "/little-things/12.png",
    alt: "Feather found on a quiet morning",
    title: "Feather",
    description:
      "Found on my doorstep one still morning. I like to think it was left there on purpose, a small sign that I was exactly where I needed to be.",
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
              A million little things to be grateful for.
            </h1>

            <div className="mt-12 flex flex-col gap-1 text-sm font-light tracking-wide text-neutral-500">
              <span>Little Things</span>
              <span>2025</span>
              <span>craftwithanna</span>
              <span>Ephemera, mixed media</span>
            </div>

            <p className="mt-10 max-w-md text-base font-light leading-relaxed text-neutral-600">
              A digitized collection of small, ordinary objects, each carrying a
              memory, a moment, or a person that I feel grateful for.
            </p>
          </section>
        </Reveal>
      </div>
    </main>
  );
}
