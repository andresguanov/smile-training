import { Directive } from 'vue';

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

/**
 * Allows only a subset of HTML tags and attributes.
 * Removes the rest but keeps the content.
 */
function sanitizeHtml(html: string): string {
  /**
   * Add more tags as needed.
   */
  const allowedTags = [
    'b',
    'strong',
    'i',
    'em',
    'u',
    's',
    'a',
    'span',
    'p',
    'div',
    'br',
    'ul',
    'ol',
    'li',
  ];

  /**
   * Add more attributes as needed
   * For each tag, specify an array of allowed attributes.
   **/
  const allowedAttributes = {
    a: ['href', 'target'],
  };

  const allowedAttributesForAllTags = ['class', 'style'];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function cleanNode(node: HTMLElement) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();

      // If the tag is not allowed, replace the node with its text content
      if (!allowedTags.includes(tagName)) {
        const textNode = document.createTextNode(node.textContent || '');
        node.replaceWith(textNode);
        return;
      }

      // Remove any attributes that are not allowed
      Array.from(node.attributes).forEach(attr => {
        if (!allowedAttributesForAllTags.includes(attr.name)) {
          node.removeAttribute(attr.name);
        }

        if (!allowedAttributes[tagName as keyof typeof allowedAttributes]?.includes(attr.name)) {
          node.removeAttribute(attr.name);
        }
      });
    }

    // Recursively sanitize child nodes
    Array.from(node.childNodes).forEach(childNode => {
      if (childNode.nodeType === Node.ELEMENT_NODE) {
        cleanNode(childNode as HTMLElement);
      }
    });
  }

  Array.from(doc.body.childNodes).forEach(node => {
    cleanNode(node as HTMLElement);
  });

  return doc.body.innerHTML;
}

export default vHtmlSanitized;
