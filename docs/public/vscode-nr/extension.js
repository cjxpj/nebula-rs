const vscode = require('vscode');

// ============ 模块函数注册表 ============

/** 核心函数（始终可用） */
const CORE = [
    ['打印',       '打印输出'],
    ['打印返回',   '打印并返回结果'],
    ['回调',       '回调函数'],
    ['主回调',     '回调主触发词'],
    ['.回调',      '实例回调'],
    ['启动服务器',  '启动 HTTP 服务器'],
    ['截取',       '提取子串'],
    ['替换',       '替换字符串'],
    ['删前缀',     '删除前缀'],
    ['删后缀',     '删除后缀'],
    ['new',        '创建对象实例'],
    ['访问',       'GET 请求'],
    ['访问POST',   'POST 请求'],
    ['访问转发',   '转发 HTTP 请求'],
    // 文件操作
    ['写文件',          '写文本到文件'],
    ['读文件',          '读取文件内容'],
    ['写',              '键值写入 database/'],
    ['读',              '键值读取 database/'],
    ['删除文件',        '删除文件'],
    ['删除文件夹',      '递归删除文件夹'],
    ['存在文件',        '判断文件存在'],
    ['存在文件夹',      '判断文件夹存在'],
    ['存在文件或文件夹', '判断路径存在'],
    ['文件后缀',        '获取文件扩展名'],
    ['读文件.随机一行',  '随机读取一行'],
    ['读文件行',        '读取指定行'],
    ['读文件.行数',     '统计文件行数'],
    ['文件夹列表',      '列出子目录'],
    ['文件列表',        '列出文件'],
    ['随机文件夹名',    '随机选子目录'],
    ['随机文件名',      '随机选文件'],
    ['文件夹大小',      '目录大小(字节)'],
    ['文件大小',        '文件大小(字节)'],
    ['重命名',          '重命名文件/文件夹'],
    ['复制粘贴',        '复制文件/文件夹'],
    ['下载文件',        '下载文件到本地'],
];

/** 标准库模块函数 */
const MODULES = {
    '@字符串': [
        ['s.长度',      '获取字符串长度'],
        ['s.截取',      '截取子串'],
        ['s.替换',      '替换子串'],
        ['s.删前缀',    '删除前缀'],
        ['s.删后缀',    '删除后缀'],
        ['s.大写',      '转大写'],
        ['s.小写',      '转小写'],
        ['s.首字母大写', '首字母大写'],
        ['s.大小写互换', '大小写互换'],
        ['s.查找',      '查找子串位置'],
        ['s.计数',      '统计子串次数'],
        ['s.开头判断',  '判断开头子串'],
        ['s.结尾判断',  '判断结尾子串'],
        ['s.判断字母',  '判断是否字母'],
        ['s.判断小写',  '判断是否小写'],
        ['s.判断大写',  '判断是否大写'],
        ['s.文本分割',  '分割文本'],
        ['s.头尾去空',  '去除头尾空白'],
        ['s.判断数字',  '判断是否数字'],
        ['s.文本包含',  '判断是否包含子串'],
        ['s.判断空白',  '判断是否空白'],
        ['s.文本连接',  '连接文本'],
        ['s.文本重复',  '重复文本'],
        ['s.左对齐',    '左对齐'],
        ['s.右对齐',    '右对齐'],
        ['s.居中',      '居中'],
    ],
    '@数学': [
        ['m.绝对值',    '绝对值'],
        ['m.最大值',    '取最大值'],
        ['m.最小值',    '取最小值'],
        ['m.取整',      '四舍五入取整'],
        ['m.幂运算',    '幂运算'],
        ['m.求和',      '求和'],
        ['m.向上取整',  '向上取整'],
        ['m.向下取整',  '向下取整'],
    ],
    '@类型': [
        ['t.转文本',    '转为文本'],
        ['t.转数字',    '转为数字'],
        ['t.转整数',    '转为整数'],
        ['t.转浮点',    '转为浮点'],
    ],
    '@访问': [
        ['访问.新建',     '创建 HTTP 请求对象'],
        ['访问.切换GET',  '切换为 GET'],
        ['访问.切换POST', '切换为 POST'],
        ['访问.POST',     '设置 POST body'],
        ['访问.POST文件', '设置文件上传'],
        ['访问.启用跳转', '允许重定向'],
        ['访问.禁用跳转', '禁止重定向'],
        ['访问.设置头部', '设置请求头'],
        ['访问.设置超时', '设置超时(秒)'],
        ['访问.发送',     '发送请求'],
        ['访问.全部内容', '返回完整响应'],
        ['访问.内容',     '返回响应 body'],
    ],
    '@画布': [
        ['创建画布',      '创建画布对象'],
        ['画布.获取',     '获取画布图像'],
        ['画笔.设置颜色', '设置画笔颜色'],
        ['画笔.获取颜色', '获取画笔颜色'],
        ['画笔.大小',    '设置画笔大小'],
        ['绘制.点',       '绘制点'],
        ['绘制.线',       '绘制直线'],
        ['绘制.喷漆',    '喷漆效果'],
        ['绘制.波浪',    '波浪线条'],
        ['绘制.油漆桶',  '洪水填充'],
        ['绘制.方形',    '填充方形'],
        ['绘制.方形描边','方形描边'],
        ['绘制.椭圆',    '填充椭圆'],
        ['绘制.椭圆描边','椭圆描边'],
        ['绘制.圆形',    '填充圆形'],
        ['绘制.圆形描边','圆形描边'],
        ['绘制.多边形',  '填充多边形'],
        ['绘制.多边形描边','多边形描边'],
        ['绘制.圆弧',    '绘制圆弧'],
        ['绘制.图片',    '绘制图片'],
        ['绘制.文本',    '绘制文本'],
        ['绘制.随机点',  '随机散布点'],
        ['绘制.随机线条','随机线条'],
        ['画布.灰度',    '转灰度'],
        ['画布.马赛克',  '全画布马赛克'],
        ['绘制.马赛克',  '区域马赛克'],
        ['绘制.高斯模糊','区域高斯模糊'],
        ['画布.旋转',    '旋转画布'],
        ['画布.圆形',    '画布圆角'],
    ],
};

// ============ 激活入口 ============

function activate(context) {
    // ── 状态栏：显示已加载模块 ──
    const statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right, 99
    );
    function updateStatusBar() {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'nr') {
            const modules = scanImports(editor.document);
            if (modules.length === 0) {
                statusBar.text = 'NR';
                statusBar.tooltip = '无引入模块 — 仅核心函数可用';
            } else {
                statusBar.text = `NR +${modules.length}模块`;
                statusBar.tooltip = '已加载: ' + modules.join(', ');
            }
            statusBar.show();
        } else {
            statusBar.hide();
        }
    }

    updateStatusBar();
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        vscode.workspace.onDidChangeTextDocument(updateStatusBar),
        statusBar
    );

    // ── 补全 Provider ──
    const provider = vscode.languages.registerCompletionItemProvider('nr', {
        provideCompletionItems(document, position) {
            const line = document.lineAt(position.line);
            const charBefore = position.character > 0
                ? line.text[position.character - 1]
                : '';

            if (charBefore === '$') { return dollarItems(document, position); }
            if (charBefore === '[') { return bracketItems(position); }
            if (charBefore === '%') { return percentItems(position); }
            if (charBefore === '.') { return dotItems(document, position); }
            if (charBefore === '#') { return hashItems(document, position); }
            return [];
        }
    },
        '$', '[', '%', '.', '#'
    );

    context.subscriptions.push(provider);
}

// ============ 补全项生成 ============

/** $ → 函数调用：核心 + 已引入的模块函数 */
function dollarItems(document, position) {
    const funcs = collectFunctions(document);
    const items = [];
    for (const [name, detail] of funcs) {
        items.push(f(name, detail, '$' + name + ' ${1}$$', position));
    }
    return items;
}

/** [ → 入口标记 */
function bracketItems(position) {
    const rg = rangeAt(position);
    return [
        k('函数]', '定义函数入口', rg),
        k('内部]', '定义内部回调入口', rg),
        k('类]',   '定义类入口', rg),
        k('f]',    '函数入口简写', rg),
        k('L]',    '类入口简写', rg),
        k('f:]',   '类方法定义 [f:ClassName]', rg),
    ];
}

/** % → 内置变量 */
function percentItems(position) {
    const rg = rangeAt(position);
    return [
        v('时间戳',      'Unix 时间戳（秒）', rg),
        v('毫秒时间戳',  'Unix 时间戳（毫秒）', rg),
        v('微秒时间戳',  'Unix 时间戳（微秒）', rg),
        v('纳秒时间戳',  'Unix 时间戳（纳秒）', rg),
        v('时间',        '当前时间 YYYY-MM-DD HH:MM:SS', rg),
        v('随机数',      '随机整数 %随机数1-100%', rg),
    ];
}

/** . → 实例回调 + 模块方法（按需过滤含 . 的函数） */
function dotItems(document, position) {
    const funcs = collectFunctions(document).filter(([name]) => name.includes('.'));
    const items = [];
    for (const [name, detail] of funcs) {
        const shortName = name.substring(name.indexOf('.') + 1);
        const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
        item.detail = detail;
        item.insertText = new vscode.SnippetString('.' + shortName + ' ${1}$$');
        item.range = rangeAt(position);
        item.filterText = name;
        items.push(item);
    }
    return items;
}

// ============ 工具函数 ============

/**
 * 扫描文档中的 #引入=@xxx 行，收集：核心函数 + 所有已引入模块的函数
 */
function collectFunctions(document) {
    const imported = scanImports(document);
    const result = [...CORE];
    for (const mod of imported) {
        if (MODULES[mod]) {
            result.push(...MODULES[mod]);
        }
    }
    return result;
}

/** 扫描 #引入=@xxx，返回模块名数组 */
function scanImports(document) {
    const text = document.getText();
    const re = /#引入=(@\S+)/g;
    const imported = new Set();
    let m;
    while ((m = re.exec(text)) !== null) {
        imported.add(m[1]);
    }
    return [...imported];
}

/** # → @模块名 补全（仅当光标在 #引入=@ 之后触发） */
function hashItems(document, position) {
    const line = document.lineAt(position.line);
    const prefix = line.text.substring(0, position.character);
    if (!/#引入=@?\S*$/.test(prefix)) { return []; }

    const items = [];
    for (const mod of Object.keys(MODULES)) {
        const item = new vscode.CompletionItem(mod, vscode.CompletionItemKind.Module);
        item.detail = `${MODULES[mod].length} 个函数`;
        item.insertText = mod;
        item.filterText = mod;
        items.push(item);
    }
    return items;
}

function f(label, detail, snippet, position) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Function);
    item.detail = detail;
    item.insertText = new vscode.SnippetString(snippet);
    if (position) {
        item.range = rangeAt(position);
        item.filterText = '$' + label;
    }
    return item;
}

function k(label, detail, range) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Snippet);
    item.detail = detail;
    item.insertText = '[' + label;
    if (range) {
        item.range = range;
        item.filterText = '[' + label;
    }
    return item;
}

function v(label, detail, range) {
    const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Variable);
    item.detail = detail;
    item.insertText = '%' + label + '%';
    if (range) {
        item.range = range;
        item.filterText = '%' + label;
    }
    return item;
}

/** 覆盖光标前 1 个字符（触发字符）的 Range */
function rangeAt(position) {
    return new vscode.Range(
        position.line, Math.max(0, position.character - 1),
        position.line, position.character
    );
}

function deactivate() {}

module.exports = { activate, deactivate };
