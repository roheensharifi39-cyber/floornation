import Image from "next/image";

import type { ProjectImage } from "@/data/projects";

const galleryLayouts = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-24",
  "lg:col-span-9 lg:col-start-3 lg:mt-10",
] as const;

const galleryRatios: Record<ProjectImage["orientation"], string> = {
  wide: "aspect-[4/3] sm:aspect-[16/10]",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[4/5]",
};

type ProjectGalleryProps = {
  readonly images: readonly ProjectImage[];
  readonly projectTitle: string;
};

export function ProjectGallery({
  images,
  projectTitle,
}: ProjectGalleryProps) {
  return (
    <section
      aria-labelledby="project-gallery-title"
      className="bg-canvas py-20 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-6 sm:mb-16">
          <h2
            className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-[-0.03em] text-ink"
            id="project-gallery-title"
          >
            Project details
          </h2>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-muted sm:block">
            Material, proportion, and execution across {projectTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12 lg:gap-y-20">
          {images.map((image, index) => (
            <figure
              className={`min-w-0 ${galleryLayouts[index % galleryLayouts.length]}`}
              key={image.src}
            >
              <div
                className={`group relative overflow-hidden bg-surface ${galleryRatios[image.orientation]}`}
              >
                <Image
                  alt={image.alt}
                  className="object-cover transition-transform ease-out motion-safe:duration-700 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none"
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 40px), 65vw"
                  src={image.src}
                />
              </div>
              <figcaption className="mt-4 border-t border-line pt-3 text-sm leading-6 text-muted">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

