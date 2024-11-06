export interface sCarouselProps {
  id?: string;
  modelValue: number;
  actionsInline: boolean;
  items: sCarouselSlide[];
  showIndicators?: boolean;
}

export interface sCarouselSlide {
  id: string;
  bannerImage?: string;
  title?: string;
  description?: string;
  showIndicators?: boolean;
  action?: () => void;
}
