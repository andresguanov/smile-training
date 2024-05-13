<template>
  <s-card class="survey_card" :title="title" :subtitle="subtitle">
    <SEmotionCardList v-model="inputs.emotionSelected"></SEmotionCardList>

    <template #footer>
      <form class="sui_survey_card_form" @submit.prevent="emit('send', inputs)">
        <Transition>
          <slot name="comment_input" :isActive="inputs.emotionSelected == 'hard'">
            <sm-textarea
              v-if="inputs.emotionSelected === 'hard'"
              class="sui_textarea_input"
              v-model="inputs.comments"
              :label="labelCommentTextarea"
              mark-type="required"
              placeholder="Deja tu comentario..."
              required
            />
          </slot>
        </Transition>
        <div class="sui_survey_card_footer">
          <s-button emphasis="text" @click="emit('close')">{{ labelBtnCancel }}</s-button>
          <s-button :disabled="!inputs.emotionSelected" native-type="submit">{{
            labelBtnSend
          }}</s-button>
        </div>
      </form>
    </template>
  </s-card>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import SEmotionCardList from '../SEmotionCard/SEmotionCardList.vue';
import { SurveyInputs } from '~/interfaces';

withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    labelBtnCancel?: string;
    labelBtnSend?: string;
    labelCommentTextarea?: string;
  }>(),
  {
    subtitle: 'Nos encantaría saber tu opinión.',
    labelBtnCancel: 'Omitir',
    labelBtnSend: 'Enviar',
    labelCommentTextarea: '¿Podrías decirnos por qué?',
  }
);

const inputs = reactive<SurveyInputs>({
  comments: '',
  emotionSelected: null,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'send', data: SurveyInputs): void;
}>();
</script>
<style scoped src="./SSurveyCard.scss"></style>
