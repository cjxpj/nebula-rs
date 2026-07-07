import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const vscodeDir = path.resolve(__dirname, 'public', 'vscode-nr');

/**
 * Vite 插件：dev / build 时自动将 public/vscode-nr/ 打包为 .vsix
 */
export function vsixPackager() {
    let done = false;

    function pack() {
        if (done) { return; }
        done = true;

        console.log('\n[vsix-packager] 正在打包 VS Code 扩展...');

        try {
            execSync('npx @vscode/vsce package --out .', {
                cwd: vscodeDir,
                stdio: 'inherit',
                shell: true
            });
            console.log('[vsix-packager] 打包完成\n');
        } catch (err) {
            console.error('[vsix-packager] 打包失败:', err.message);
        }
    }

    return {
        name: 'vitepress-vsix-packager',

        buildStart() {
            pack();
        },

        configureServer(server) {
            // dev 模式下先打包，再监听源文件变化自动重打包
            pack();

            const watcher = ['package.json', 'syntaxes', 'snippets', 'language-configuration.json', 'extension.js'];
            for (const file of watcher) {
                const fp = path.resolve(vscodeDir, file);
                server.watcher.add(fp);
            }

            server.watcher.on('change', (changedPath) => {
                if (changedPath.startsWith(vscodeDir) && !changedPath.endsWith('.vsix')) {
                    console.log('\n[vsix-packager] 检测到扩展文件变更，重新打包...');
                    done = false;
                    pack();
                }
            });
        }
    };
}
