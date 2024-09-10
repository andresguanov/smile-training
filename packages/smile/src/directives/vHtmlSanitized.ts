import { Directive } from 'vue';
import DOMPurify from 'dompurify';

/**
 * Similar to v-html, but sanitizes the content before injecting it into the DOM.
 */
const vHtmlSanitized: Directive = {
  beforeMount(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value);
  },
  updated(el, binding) {
    el.innerHTML = sanitizeHtml(binding.value);
  },
};

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html);
}

export default vHtmlSanitized;
