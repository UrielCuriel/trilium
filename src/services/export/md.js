"use strict";

const TurndownService = require("turndown");
const turndownPluginGfm = require("joplin-turndown-plugin-gfm");

let instance = null;

function toMarkdown(content) {
  if (instance === null) {
    instance = new TurndownService();
    instance.use(turndownPluginGfm.gfm);
  }

  console.log(content);

  return instance.turndown(content);
}

/**
 *
 * @param {any[]} attrs
 * @returns
 */
function exportAttrs(attrs) {
  console.log(attrs);
  let attrsContent = "---\n";

  attrs
    .filter((attr) => !attr.isInheritable)
    .forEach((attr) => {
      attrsContent += `${attr.name}: ${attr.value}\n`;
    });
  attrsContent += "---\n";

  return attrsContent;
}
/**
 *
 * @param {string} content
 * @returns
 */
function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

module.exports = {
  toMarkdown,
  exportAttrs,
  getReadingTime,
};
