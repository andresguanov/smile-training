export interface sCarousel {
  image: string;
  title: string;
  description: string;
}

export interface sCarouselProps {
  items: sCarousel[];
  showIndicators?: boolean;
}

export interface sCarouselSlide {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  showIndicators?: boolean;
  action?: () => void;
}
