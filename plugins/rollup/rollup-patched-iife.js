import iife from 'rollup-plugin-iife';

export default function (options = { include: [] }) {
  const iifeInstance = iife();
  const originalRenderChunk = iifeInstance.renderChunk;

  iifeInstance.renderChunk = function(code, chunk, outputOptions) {
    if (options.include.includes(chunk.name)) {
      return originalRenderChunk.call(this, code, chunk, outputOptions);
    }
  };

  return iifeInstance;
};
