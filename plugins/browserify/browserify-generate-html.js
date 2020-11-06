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

module.exports = (
  options = {
    dist: 'dist',
    fileName: 'index.html',
    scripts: [],
    styles: [],
    template: '',
  }
) => {
  const htmlTemplate = options.template
    ? fs.readFileSync(options.template, 'utf8')
    : defaultHtmlTemplate;

  const scripts = options.scripts
    .map(x => `<script src="${x}"></script>`)
    .join('\n');

  const styles = options.styles
    .map(x => `<link href="${x}" rel="stylesheet">`)
    .join('\n');

  const html = htmlTemplate
    .replace(/\<\/head>/mi, `${styles}\n</head>`) // Insert styles before closing head
    .replace(/\<\/body>/mi, `${scripts}\n</body>`) // Insert scripts before closing body

  fs.writeFileSync(`${options.dist}/${options.fileName}`, html);
};
