import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps {
  slides: React.ReactNode[]; // Array of JSX elements or components for slides
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  showDots?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options,
  showArrows = true,
  showDots = true,
  autoplayDelay = 4000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', ...options },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect(); // Set initial selected index
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  console.log("Rendering Carousel with", slides.length, "slides. Selected index:", selectedIndex);

  if (!slides || slides.length === 0) {
    return <div className="text-center p-4">No slides to display.</div>;
  }

  return (
    <div className="relative">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 p-1" key={index}>
              <Card className="h-full"> {/* Ensure card takes full height of slide if needed */}
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  {slide}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {showArrows && emblaApi && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
            onClick={scrollPrev}
            disabled={!emblaApi?.canScrollPrev()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
            onClick={scrollNext}
            disabled={!emblaApi?.canScrollNext()}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}

      {showDots && emblaApi && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <Button
              key={index}
              variant={index === selectedIndex ? 'default' : 'outline'}
              size="icon"
              className="h-2 w-2 p-0 rounded-full"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Carousel;