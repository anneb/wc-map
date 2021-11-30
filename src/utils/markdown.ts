import {marked, Renderer} from 'marked/lib/marked.esm';

const renderer = new Renderer();
renderer.link = ( href, title, text ) => `<a target="_blank" href="${href}" ${title?`title="${title}"`:''}>${text}</a>`

export function markdownToHtml(markdown: string) {
    return marked(markdown, {renderer: renderer});
}