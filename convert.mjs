import fs from 'fs';

let html = fs.readFileSync('../stitch_harsh_industries_b2b_landing_page/code.html', 'utf8');

// extract body contents
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
let bodyHtml = bodyMatch ? bodyMatch[1] : html;

// simple html to jsx
bodyHtml = bodyHtml.replace(/class=/g, 'className=');
bodyHtml = bodyHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
bodyHtml = bodyHtml.replace(/<img([^>]+)>/g, (match, attrs) => {
    if (attrs.trim().endsWith('/')) return match;
    return `<img${attrs} />`;
});
bodyHtml = bodyHtml.replace(/<input([^>]+)>/g, (match, attrs) => {
    if (attrs.trim().endsWith('/')) return match;
    return `<input${attrs} />`;
});
bodyHtml = bodyHtml.replace(/<br>/g, '<br />');

// fix style tags
bodyHtml = bodyHtml.replace(/style="background-image:\s*url\('([^']+)'\)"/g, "style={{ backgroundImage: `url('$1')` }}");

const component = `
export default function Home() {
  return (
    <>
      ${bodyHtml}
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', component);
