/**
 * @author Frank Aguado
 */
import { IconType } from './sm-icon.interface';

export type EmotionId = 'easy' | 'neutral' | 'hard';

export interface EmotionCardOption {
  id: EmotionId;
  label: string;
  icon: IconType;
}

export type EmotionCardOptions = Array<EmotionCardOption>;

export interface SurveyInputs {
  emotionSelected: EmotionId | null;
  comments?: string;
}
