import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function caseSensitiveCheckPlugin() {
  return {
    name: 'vite-plugin-case-sensitive-check',
    enforce: 'pre',
    resolveId(source, importer) {
      if (importer && (source.startsWith('.') || source.startsWith('/')) && !source.includes('\0')) {
        const resolved = path.resolve(path.dirname(importer), source);
        let actualTarget = resolved;
        if (!fs.existsSync(actualTarget)) {
          if (fs.existsSync(actualTarget + '.vue')) actualTarget += '.vue';
          else if (fs.existsSync(actualTarget + '.js')) actualTarget += '.js';
        }
        if (fs.existsSync(actualTarget)) {
          let current = path.parse(actualTarget).root;
          const relative = path.relative(current, actualTarget);
          const segments = relative.split(path.sep);
          for (const seg of segments) {
            if (!seg) continue;
            if (fs.existsSync(current)) {
              const children = fs.readdirSync(current);
              const exact = children.find(c => c === seg);
              if (!exact) {
                const caseMatch = children.find(c => c.toLowerCase() === seg.toLowerCase());
                if (caseMatch) {
                  throw new Error(`[Case Sensitivity Error] File "${importer}" imports "${source}", but path segment "${seg}" is actually "${caseMatch}" on disk.`);
                }
              }
            }
            current = path.join(current, seg);
          }
        }
      }
      return null;
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    caseSensitiveCheckPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.vue', '.json', '.mjs']
  },
})

