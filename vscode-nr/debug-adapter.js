/**
 * NR Language Debug Adapter（备用桥接脚本）
 *
 * 主要调试方式：extension.js 中注册的 DebugAdapterDescriptorFactory
 * 直接启动 nebula --debug [file]，由 VS Code 通过 stdin/stdout 管理通信。
 *
 * 此脚本作为备用方案，适用于以下场景：
 * - 其他支持 DAP 的编辑器（非 VS Code）
 * - 通过 NR_FILE 环境变量指定 .nr 文件手动启动
 * - 旧版 package.json 中 "program" 字段的降级方案
 *
 * 用法：node debug-adapter.js
 * 环境变量：
 *   NR_FILE     - 要调试的 .nr 文件路径
 *   NEBULA_EXE  - nebula 可执行文件路径（可选）
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * 查找 nebula 可执行文件
 * 优先级：
 * 1. 环境变量 NEBULA_EXE
 * 2. 环境变量 NEBULA_PATH
 * 3. 同目录下的 nebula(.exe)
 * 4. PATH 中的 nebula
 */
function findNebula() {
    if (process.env.NEBULA_EXE) {
        return process.env.NEBULA_EXE;
    }
    if (process.env.NEBULA_PATH) {
        return process.env.NEBULA_PATH;
    }

    const exeName = process.platform === 'win32' ? 'nebula.exe' : 'nebula';
    const localPath = path.join(__dirname, exeName);
    if (fs.existsSync(localPath)) {
        return localPath;
    }

    return 'nebula';
}

/**
 * 启动 nebula --debug 进程
 * @param {string|null} nrFile - .nr 文件路径（可为 null，由 DAP launch 请求传入）
 */
function startNebula(nrFile) {
    const nebulaPath = findNebula();
    const args = ['--debug'];

    if (nrFile && fs.existsSync(nrFile)) {
        args.push(nrFile);
    }
    // 如果不传文件，nebula 在收到 launch 请求时会动态加载

    const nebula = spawn(nebulaPath, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
    });

    nebula.stdout.pipe(process.stdout);
    process.stdin.pipe(nebula.stdin);
    nebula.stderr.pipe(process.stderr);

    nebula.on('close', (code) => {
        process.exit(code || 0);
    });

    nebula.on('error', (err) => {
        console.error('Failed to start nebula:', err.message);
        process.exit(1);
    });

    return nebula;
}

// 获取文件路径：环境变量 → 命令行参数
const nrFile = process.env.NR_FILE || process.argv.find(a => a.endsWith('.nr'));
const nebula = startNebula(nrFile || null);

// 优雅退出
process.on('SIGTERM', () => {
    nebula.kill();
    process.exit(0);
});

process.on('SIGINT', () => {
    nebula.kill();
    process.exit(0);
});
