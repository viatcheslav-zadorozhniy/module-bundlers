const fs = require('fs');

const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
</body>
</html>
`;

export default (options = { template: '' }) => {
  return {
    name: 'generate-html',
    async generateBundle(output, bundle) {
      const htmlTemplate = options.template
        ? fs.readFileSync(options.template, 'utf8')
        : defaultHtmlTemplate;

      const styles = Object
        .values(bundle)
        .filter(x => x.fileName.toLowerCase().endsWith('.css'))
        .map(x => `<link href="${x.fileName}" rel="stylesheet">`)
        .join('\n');

      const scripts = Object.values(bundle)
        .filter(x => x.isEntry)
        .map(x => x.imports.concat(x.fileName))
        .reduce((a, b) => a.concat(...b), [])
        .map(x => `<script src="${x}"></script>`)
        .join('\n');

      const html = htmlTemplate
        .replace(/\<\/head>/mi, `${styles}\n</head>`) // Insert styles before closing head
        .replace(/\<\/body>/mi, `${scripts}\n</body>`) // Insert scripts before closing body

      // https://rollupjs.org/guide/en/#thisemitfileemittedfile-emittedchunk--emittedasset--string
      this.emitFile({
        type: 'asset',
        source: html,
        fileName: 'index.html'
      });
    }
  };
};
