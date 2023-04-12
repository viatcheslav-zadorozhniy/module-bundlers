const fs = require('fs');

module.exports = (
  options = {
    dist: 'dist',
    fileName: 'index.html',
    scripts: [],
    styles: [],
    template: '',
  }
) => {
  const htmlTemplate = fs.readFileSync(options.template, 'utf8');
  const styles = (options.styles || []).map(x => `<link href="${x}" rel="stylesheet">`).join('');
  const scripts = (options.scripts || []).map(x => `<script src="${x}" defer></script>`).join('');

  const html = htmlTemplate
    .replace(/\<\/head>/mi, `${styles}\n</head>`) // Insert styles before closing head
    .replace(/\<\/body>/mi, `${scripts}\n</body>`) // Insert scripts before closing body

  fs.writeFileSync(`${options.dist}/${options.fileName}`, html);
};
