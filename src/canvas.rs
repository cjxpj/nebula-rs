//! 画布模块 — 对标 Go drawimg2.go
//!
//! 提供图像创建、绘制操作、特效处理等功能。
//! 使用方式：
//! ```nr
//! c:#引入=@画布
//! 画布:$创建画布 800 600$          → 返回句柄
//! $画笔.设置颜色 红色$              → 设置画笔颜色
//! $画笔.大小 %画布% 3$              → 设置线条粗细
//! $绘制.线 %画布% 0 0 100 100$     → 画线
//! $绘制.文本 %画布% Hello 50 50 20 红色$ → 画文本
//! $画布.获取 %画布%$                → 返回 base64 PNG 数据
//! ```

use std::collections::HashMap;
use std::sync::Mutex;
use std::sync::LazyLock;
use std::sync::atomic::{AtomicUsize, Ordering};

use image::codecs::jpeg::JpegEncoder;
use image::codecs::png::PngEncoder;
use image::{ExtendedColorType, ImageEncoder, RgbaImage};

// ==================== 全局存储 ====================

static CANVAS_ID: AtomicUsize = AtomicUsize::new(0);

fn next_canvas_id() -> usize {
    CANVAS_ID.fetch_add(1, Ordering::Relaxed)
}

/// 画布数据结构 — 对标 Go NDrawImg
#[derive(Debug, Clone)]
pub struct CanvasData {
    pub width: u32,
    pub height: u32,
    pub pixels: Vec<u8>,      // RGBA 像素数据，长度 = width * height * 4
    pub color: [u8; 4],       // 画笔颜色 RGBA（对标 Go color *color.NRGBA）
    pub size: f64,             // 画笔线条宽度（对标 Go size float64）
    pub font_data: Option<Vec<u8>>, // 字体数据（对标 Go font *opentype.Font）
}

impl CanvasData {
    /// 创建指定尺寸的画布，用背景色填充
    pub fn new(width: u32, height: u32, bg: [u8; 4]) -> Self {
        let len = (width as usize) * (height as usize) * 4;
        let mut pixels = vec![0u8; len];
        for i in (0..len).step_by(4) {
            pixels[i] = bg[0];
            pixels[i + 1] = bg[1];
            pixels[i + 2] = bg[2];
            pixels[i + 3] = bg[3];
        }
        CanvasData {
            width,
            height,
            pixels,
            color: [0, 0, 0, 255],
            size: 1.0,
            font_data: None,
        }
    }

    /// 获取像素索引
    #[inline]
    fn idx(&self, x: u32, y: u32) -> usize {
        (y as usize * self.width as usize + x as usize) * 4
    }

    /// 判断坐标是否在画布内
    #[inline]
    pub fn in_bounds(&self, x: i32, y: i32) -> bool {
        x >= 0 && y >= 0 && (x as u32) < self.width && (y as u32) < self.height
    }

    /// 获取像素 RGBA
    pub fn get_pixel(&self, x: u32, y: u32) -> [u8; 4] {
        let i = self.idx(x, y);
        [self.pixels[i], self.pixels[i + 1], self.pixels[i + 2], self.pixels[i + 3]]
    }

    /// 设置像素 RGBA
    pub fn set_pixel(&mut self, x: u32, y: u32, c: [u8; 4]) {
        let i = self.idx(x, y);
        self.pixels[i] = c[0];
        self.pixels[i + 1] = c[1];
        self.pixels[i + 2] = c[2];
        self.pixels[i + 3] = c[3];
    }

    /// alpha 混合: 将 src 颜色绘制到 (x,y)，带 alpha 混合
    pub fn blend_pixel(&mut self, x: i32, y: i32, c: [u8; 4]) {
        if !self.in_bounds(x, y) || c[3] == 0 {
            return;
        }
        if c[3] == 255 {
            self.set_pixel(x as u32, y as u32, c);
            return;
        }
        let i = self.idx(x as u32, y as u32);
        let sa = c[3] as f32 / 255.0;
        let da = 1.0 - sa;
        self.pixels[i] = (c[0] as f32 * sa + self.pixels[i] as f32 * da) as u8;
        self.pixels[i + 1] = (c[1] as f32 * sa + self.pixels[i + 1] as f32 * da) as u8;
        self.pixels[i + 2] = (c[2] as f32 * sa + self.pixels[i + 2] as f32 * da) as u8;
        self.pixels[i + 3] = (c[3] as f32 * sa + self.pixels[i + 3] as f32 * da) as u8;
    }

    /// 返回原始 RGBA 像素数据
    pub fn raw_pixels(&self) -> &[u8] {
        &self.pixels
    }

    /// 从 RGBA 像素数据创建
    pub fn from_raw(width: u32, height: u32, pixels: Vec<u8>) -> Self {
        CanvasData {
            width,
            height,
            pixels,
            color: [0, 0, 0, 255],
            size: 1.0,
            font_data: None,
        }
    }
}

/// 全局画布存储
pub static CANVAS_STORE: LazyLock<Mutex<HashMap<String, CanvasData>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

pub fn get_canvas(handle: &str) -> Option<CanvasData> {
    CANVAS_STORE.lock().ok()?.get(handle).cloned()
}

pub fn set_canvas(handle: &str, canvas: CanvasData) {
    if let Ok(mut store) = CANVAS_STORE.lock() {
        store.insert(handle.to_string(), canvas);
    }
}

// ==================== Base64 编解码 ====================

const BASE64_CHARS: &[u8; 64] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

fn base64_encode(data: &[u8]) -> String {
    let mut result = String::with_capacity((data.len() + 2) / 3 * 4);
    for chunk in data.chunks(3) {
        let b0 = chunk[0] as u32;
        let b1 = if chunk.len() > 1 { chunk[1] as u32 } else { 0 };
        let b2 = if chunk.len() > 2 { chunk[2] as u32 } else { 0 };
        let triple = (b0 << 16) | (b1 << 8) | b2;
        result.push(BASE64_CHARS[((triple >> 18) & 0x3F) as usize] as char);
        result.push(BASE64_CHARS[((triple >> 12) & 0x3F) as usize] as char);
        if chunk.len() > 1 {
            result.push(BASE64_CHARS[((triple >> 6) & 0x3F) as usize] as char);
        } else {
            result.push('=');
        }
        if chunk.len() > 2 {
            result.push(BASE64_CHARS[(triple & 0x3F) as usize] as char);
        } else {
            result.push('=');
        }
    }
    result
}


// ==================== 颜色解析 ====================

/// 命名颜色表
fn named_color(s: &str) -> Option<[u8; 4]> {
    let lower = s.to_lowercase();
    match lower.as_str() {
        "red" | "红色" => Some([255, 0, 0, 255]),
        "green" | "绿色" => Some([0, 128, 0, 255]),
        "blue" | "蓝色" => Some([0, 0, 255, 255]),
        "black" | "黑色" => Some([0, 0, 0, 255]),
        "white" | "白色" => Some([255, 255, 255, 255]),
        "yellow" | "黄色" => Some([255, 255, 0, 255]),
        "cyan" | "青色" => Some([0, 255, 255, 255]),
        "magenta" | "紫色" | "品红" => Some([255, 0, 255, 255]),
        "gray" | "grey" | "灰色" => Some([128, 128, 128, 255]),
        "orange" | "橙色" => Some([255, 165, 0, 255]),
        "pink" | "粉色" => Some([255, 192, 203, 255]),
        "brown" | "棕色" => Some([165, 42, 42, 255]),
        "transparent" | "透明" => Some([0, 0, 0, 0]),
        "lime" => Some([0, 255, 0, 255]),
        "navy" | "深蓝" => Some([0, 0, 128, 255]),
        "teal" | "青绿" => Some([0, 128, 128, 255]),
        "purple" => Some([128, 0, 128, 255]),
        "maroon" | "栗色" => Some([128, 0, 0, 255]),
        "olive" | "橄榄" => Some([128, 128, 0, 255]),
        "silver" | "银色" => Some([192, 192, 192, 255]),
        "gold" | "金色" => Some([255, 215, 0, 255]),
        _ => None,
    }
}

/// 解析颜色字符串，支持:
/// - "#RRGGBB" / "#RRGGBBAA" 十六进制
/// - "R,G,B" / "R,G,B,A" 逗号分隔
/// - "随机"
/// - 英文颜色名（red, blue, green, black, white 等）
pub fn parse_color(s: &str) -> Option<[u8; 4]> {
    let s = s.trim();
    if s == "随机" {
        use std::time::{SystemTime, UNIX_EPOCH};
        let seed = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_nanos();
        let r = ((seed >> 16) & 0xFF) as u8;
        let g = ((seed >> 8) & 0xFF) as u8;
        let b = (seed & 0xFF) as u8;
        return Some([r, g, b, 255]);
    }
    // 命名颜色
    if let Some(c) = named_color(s) {
        return Some(c);
    }
    if s.starts_with('#') {
        let hex = &s[1..];
        return match hex.len() {
            6 => {
                let v = u32::from_str_radix(hex, 16).ok()?;
                Some([(v >> 16) as u8, ((v >> 8) & 0xFF) as u8, (v & 0xFF) as u8, 255])
            }
            8 => {
                let v = u32::from_str_radix(hex, 16).ok()?;
                Some([(v >> 24) as u8, ((v >> 16) & 0xFF) as u8, ((v >> 8) & 0xFF) as u8, (v & 0xFF) as u8])
            }
            _ => None,
        };
    }
    let parts: Vec<&str> = s.split(',').collect();
    if parts.len() >= 3 {
        let r: u8 = parts[0].trim().parse().ok()?;
        let g: u8 = parts[1].trim().parse().ok()?;
        let b: u8 = parts[2].trim().parse().ok()?;
        let a: u8 = if parts.len() >= 4 {
            parts[3].trim().parse().unwrap_or(255)
        } else {
            255
        };
        return Some([r, g, b, a]);
    }
    None
}

pub fn parse_f64(s: &str) -> Option<f64> {
    s.trim().parse::<f64>().ok()
}

pub fn parse_i32(s: &str) -> Option<i32> {
    s.trim().parse::<i32>().ok()
}

// ==================== 参数解析辅助函数 ====================

/// 安全获取 f64 参数，不存在或解析失败时返回默认值
fn get_arg_f64(args: &[String], index: usize, default: f64) -> f64 {
    args.get(index)
        .and_then(|s| parse_f64(s))
        .unwrap_or(default)
}

/// 安全获取 i32 参数，不存在或解析失败时返回默认值
fn get_arg_i32(args: &[String], index: usize, default: i32) -> i32 {
    args.get(index)
        .and_then(|s| parse_i32(s))
        .unwrap_or(default)
}

/// 安全获取字符串参数
fn get_arg_str(args: &[String], index: usize) -> &str {
    args.get(index).map(|s| s.as_str()).unwrap_or("")
}

// ==================== 画布函数实现 ====================

/// 创建画布 width height [bgColor]$
/// - 两个正整数: 创建空白画布
/// - 一个参数: 从 base64 图片数据创建
pub fn canvas_new(args: &[String]) -> Result<String, String> {
    let w_opt = args.get(1).and_then(|s| parse_i32(s));
    let h_opt = args.get(2).and_then(|s| parse_i32(s));

    let canvas = if let (Some(w), Some(h)) = (w_opt, h_opt) {
        if w <= 0 || h <= 0 {
            return Err("画布尺寸必须大于0".into());
        }
        let bg = args.get(3)
            .and_then(|s| parse_color(s))
            .unwrap_or([255, 255, 255, 255]);
        CanvasData::new(w as u32, h as u32, bg)
    } else if let Some(data) = args.get(1) {
        // base64 图片解码
        let stripped = if let Some(idx) = data.find(";base64,") {
            &data[idx + 8..]
        } else {
            data
        };
        let bytes = crate::value::base64_decode(stripped)?;
        // 将原始字节直接作为 RGBA 像素存储
        // 尝试解析为 BMP (跳过 54 字节头) 或直接作为 RGBA 原始数据
        if bytes.len() >= 54 && &bytes[0..2] == b"BM" {
            // BMP 文件
            let _file_size = u32::from_le_bytes([bytes[2], bytes[3], bytes[4], bytes[5]]);
            let data_offset = u32::from_le_bytes([bytes[10], bytes[11], bytes[12], bytes[13]]) as usize;
            let w = i32::from_le_bytes([bytes[18], bytes[19], bytes[20], bytes[21]]) as u32;
            let h_abs = i32::from_le_bytes([bytes[22], bytes[23], bytes[24], bytes[25]]).unsigned_abs();
            let bpp = u16::from_le_bytes([bytes[28], bytes[29]]);
            if bpp == 32 && data_offset < bytes.len() {
                let row_size = (w as usize) * 4;
                let mut pixels = vec![0u8; row_size * h_abs as usize];
                let src = &bytes[data_offset..];
                for y in 0..h_abs as usize {
                    let src_row = y * row_size;
                    let dst_row = (h_abs as usize - 1 - y) * row_size;
                    for x in 0..row_size.min(src.len().saturating_sub(src_row)) {
                        if dst_row + x < pixels.len() && src_row + x < src.len() {
                            pixels[dst_row + x] = src[src_row + x];
                        }
                    }
                }
                // BMP 是 BGRA，转为 RGBA
                for i in (0..pixels.len()).step_by(4) {
                    let b = pixels[i];
                    pixels[i] = pixels[i + 2];
                    pixels[i + 2] = b;
                }
                CanvasData::from_raw(w, h_abs, pixels)
            } else {
                return Err(format!("不支持的BMP格式: bpp={}", bpp));
            }
        } else {
            // 直接作为 RGBA 原始数据处理
            // 假设正方形 sqrt(len/4)
            let pixel_count = bytes.len() / 4;
            let side = (pixel_count as f64).sqrt() as u32;
            if side * side * 4 <= bytes.len() as u32 && side > 0 {
                CanvasData::from_raw(side, side, bytes[..(side as usize * side as usize * 4)].to_vec())
            } else {
                return Err("无法解析图片数据格式".into());
            }
        }
    } else {
        return Err("参数错误：需要 (宽, 高) 或 (图片base64)".into());
    };

    let id = next_canvas_id();
    let handle = format!("画布@{}", id);
    set_canvas(&handle, canvas);
    Ok(handle)
}

/// 画布.获取 handle [format]$
/// format: 默认返回 base64 PNG（对标 Go），支持 "png"/"jpg"/"jpeg"/"datauri"/"raw"
pub fn canvas_get(args: &[String]) -> Result<String, String> {
    let handle = get_arg_str(args, 1);
    let format = args.get(2).map(|s| s.as_str()).unwrap_or("png").to_lowercase();

    let canvas = get_canvas(handle).ok_or("画布句柄无效")?;
    let (w, h) = (canvas.width, canvas.height);

    if format == "raw" {
        let pixels = canvas.raw_pixels();
        return Ok(String::from_utf8_lossy(pixels).to_string());
    }

    // 构建 RGBA 图像
    let img: RgbaImage = image::ImageBuffer::from_raw(w, h, canvas.pixels)
        .ok_or("无法构建图像缓冲区")?;

    // 编码为指定格式
    let mut buf: Vec<u8> = Vec::new();
    match format.as_str() {
        "jpg" | "jpeg" => {
            let encoder = JpegEncoder::new_with_quality(&mut buf, 90);
            encoder.write_image(&img, w, h, ExtendedColorType::Rgba8)
                .map_err(|e| format!("JPEG编码失败: {}", e))?;
        }
        "datauri" => {
            let mut png_buf: Vec<u8> = Vec::new();
            let encoder = PngEncoder::new(&mut png_buf);
            encoder.write_image(&img, w, h, ExtendedColorType::Rgba8)
                .map_err(|e| format!("PNG编码失败: {}", e))?;
            let b64 = base64_encode(&png_buf);
            return Ok(format!("data:image/png;base64,{}", b64));
        }
        _ => {
            // 默认返回 base64 PNG
            let encoder = PngEncoder::new(&mut buf);
            encoder.write_image(&img, w, h, ExtendedColorType::Rgba8)
                .map_err(|e| format!("PNG编码失败: {}", e))?;
        }
    }

    if buf.is_empty() {
        return Ok(String::new());
    }

    Ok(base64_encode(&buf))
}

/// 解析画布句柄（从 args[1] 取）
pub fn resolve_canvas(args: &[String]) -> Result<(String, CanvasData), String> {
    let handle = get_arg_str(args, 1);
    let canvas = get_canvas(handle).ok_or("画布句柄无效")?;
    Ok((handle.to_string(), canvas))
}

fn get_draw_color(args: &[String], color_idx: usize, canvas: &CanvasData) -> [u8; 4] {
    args.get(color_idx)
        .and_then(|s| parse_color(s))
        .unwrap_or(canvas.color)
}

// ==================== 画笔函数 ====================

/// 画笔.设置颜色 handle color$
pub fn brush_set_color(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let c = args.get(2)
        .and_then(|s| parse_color(s))
        .unwrap_or([0, 0, 0, 255]);
    canvas.color = c;
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 画笔.获取颜色 [hex|随机|R,G,B]$
pub fn brush_get_color(args: &[String]) -> Result<String, String> {
    if args.len() < 2 {
        return Ok("随机".to_string());
    }
    let c = args.get(1)
        .and_then(|s| parse_color(s))
        .unwrap_or([0, 0, 0, 255]);
    Ok(format!("#{:02X}{:02X}{:02X}{:02X}", c[0], c[1], c[2], c[3]))
}

/// 画笔.大小 handle size$
pub fn brush_set_size(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let size = get_arg_f64(args, 2, 1.0);
    if size <= 0.0 {
        return Err("线条宽度必须大于0".into());
    }
    canvas.size = size;
    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制函数 ====================

/// 绘制.点 handle x y [color]$
pub fn draw_point(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: i32 = get_arg_i32(args, 2, 0);
    let y: i32 = get_arg_i32(args, 3, 0);
    let c = get_draw_color(args, 4, &canvas);

    if canvas.in_bounds(x, y) {
        canvas.set_pixel(x as u32, y as u32, c);
    }
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.线 handle x1 y1 x2 y2 [color]$
pub fn draw_line(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x1: i32 = get_arg_i32(args, 2, 0);
    let y1: i32 = get_arg_i32(args, 3, 0);
    let x2: i32 = get_arg_i32(args, 4, 0);
    let y2: i32 = get_arg_i32(args, 5, 0);
    let c = get_draw_color(args, 6, &canvas);
    let thickness = (canvas.size as i32).max(1);

    draw_thick_line(&mut canvas, x1, y1, x2, y2, thickness, c);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.方形 handle x y w h [radius|corner_string] [color]$
pub fn draw_rect_fill(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: f64 = get_arg_f64(args, 2, 0.0);
    let y: f64 = get_arg_f64(args, 3, 0.0);
    let w: f64 = get_arg_f64(args, 4, 10.0);
    let h: f64 = get_arg_f64(args, 5, 10.0);
    let radii = parse_radii(args.get(6));
    let c = get_draw_color(args, 7, &canvas);

    draw_rounded_rect_fill(&mut canvas, x, y, w, h, radii, c);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.方形描边 handle x y w h [radius|corner_string] [color]$
pub fn draw_rect_stroke(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: f64 = get_arg_f64(args, 2, 0.0);
    let y: f64 = get_arg_f64(args, 3, 0.0);
    let w: f64 = get_arg_f64(args, 4, 10.0);
    let h: f64 = get_arg_f64(args, 5, 10.0);
    let radii = parse_radii(args.get(6));
    let c = get_draw_color(args, 7, &canvas);
    let thickness = (canvas.size as f64).max(1.0);

    draw_rounded_rect_stroke(&mut canvas, x, y, w, h, radii, c, thickness);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.椭圆 handle x y w h [color]$
pub fn draw_ellipse_stroke(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: f64 = get_arg_f64(args, 2, 0.0);
    let y: f64 = get_arg_f64(args, 3, 0.0);
    let w: f64 = get_arg_f64(args, 4, 10.0);
    let h: f64 = get_arg_f64(args, 5, 10.0);
    let c = get_draw_color(args, 6, &canvas);
    let thickness = (canvas.size as f64).max(1.0);

    draw_ellipse_path(&mut canvas, x, y, w, h, c, thickness, false);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.椭圆填充 handle x y w h [color]$
pub fn draw_ellipse_fill(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: f64 = get_arg_f64(args, 2, 0.0);
    let y: f64 = get_arg_f64(args, 3, 0.0);
    let w: f64 = get_arg_f64(args, 4, 10.0);
    let h: f64 = get_arg_f64(args, 5, 10.0);
    let c = get_draw_color(args, 6, &canvas);

    draw_ellipse_path(&mut canvas, x, y, w, h, c, 0.0, true);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.圆形 handle cx cy [radius] [startDeg] [endDeg] [color]$
pub fn draw_pie_stroke(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let cx: f64 = get_arg_f64(args, 2, 0.0);
    let cy: f64 = get_arg_f64(args, 3, 0.0);
    let radius: f64 = get_arg_f64(args, 4, 50.0);
    let start_deg: f64 = get_arg_f64(args, 5, 0.0);
    let end_deg: f64 = get_arg_f64(args, 6, 360.0);
    let c = get_draw_color(args, 7, &canvas);
    let thickness = (canvas.size as f64).max(1.0);

    draw_pie_path(&mut canvas, cx, cy, radius, start_deg, end_deg, c, thickness, false);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.圆形填充 handle cx cy [radius] [startDeg] [endDeg] [color]$
pub fn draw_pie_fill(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let cx: f64 = get_arg_f64(args, 2, 0.0);
    let cy: f64 = get_arg_f64(args, 3, 0.0);
    let radius: f64 = get_arg_f64(args, 4, 50.0);
    let start_deg: f64 = get_arg_f64(args, 5, 0.0);
    let end_deg: f64 = get_arg_f64(args, 6, 360.0);
    let c = get_draw_color(args, 7, &canvas);

    draw_pie_path(&mut canvas, cx, cy, radius, start_deg, end_deg, c, 0.0, true);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.圆弧 handle cx cy radius startDeg endDeg [color]$
pub fn draw_arc(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let cx: f64 = get_arg_f64(args, 2, 0.0);
    let cy: f64 = get_arg_f64(args, 3, 0.0);
    let radius: f64 = get_arg_f64(args, 4, 50.0);
    let start_deg: f64 = get_arg_f64(args, 5, 0.0);
    let end_deg: f64 = get_arg_f64(args, 6, 360.0);
    let c = get_draw_color(args, 7, &canvas);
    let thickness = (canvas.size as f64).max(1.0);

    draw_arc_path(&mut canvas, cx, cy, radius, start_deg, end_deg, c, thickness);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.图片 handle srcCanvasOrData x y [alpha]$
pub fn draw_image(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;

    let src = args.get(2).ok_or("缺少图片来源参数")?;
    let src_canvas = if let Some(c) = get_canvas(src) {
        c
    } else if let Ok(decoded) = crate::value::base64_decode(src) {
        // 尝试作为 base64 RGBA 数据
        let pixel_count = decoded.len() / 4;
        let side = (pixel_count as f64).sqrt() as u32;
        if side * side * 4 <= decoded.len() as u32 && side > 0 {
            CanvasData::from_raw(side, side, decoded[..(side as usize * side as usize * 4)].to_vec())
        } else {
            return Err("无法解析图片数据".into());
        }
    } else {
        return Err("无效的图片来源".into());
    };

    let paste_x: i32 = get_arg_i32(args, 3, 0);
    let paste_y: i32 = get_arg_i32(args, 4, 0);
    let alpha: f32 = get_arg_f64(args, 5, 1.0) as f32;

    let src_w = src_canvas.width as i32;
    let src_h = src_canvas.height as i32;

    for sy in 0..src_h {
        for sx in 0..src_w {
            let sc = src_canvas.get_pixel(sx as u32, sy as u32);
            if sc[3] == 0 {
                continue;
            }
            let mut blended = sc;
            if alpha < 1.0 {
                blended[3] = (sc[3] as f32 * alpha) as u8;
            }
            canvas.blend_pixel(paste_x + sx, paste_y + sy, blended);
        }
    }
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.文本 handle x y text [color] [strokeColor]$
pub fn draw_text(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: i32 = get_arg_i32(args, 2, 0);
    let y: i32 = get_arg_i32(args, 3, 0);
    let text = args.get(4).cloned().unwrap_or_default();
    let c = get_draw_color(args, 5, &canvas);
    let stroke_c = args.get(6).and_then(|s| parse_color(s));

    let scale = (canvas.size as i32).max(1);

    for (ci, ch) in text.chars().enumerate() {
        let glyph = get_glyph_5x7(ch);
        let ox = x + ci as i32 * 6 * scale;
        for row in 0..7 {
            for col in 0..5 {
                if (glyph[row] >> (4 - col)) & 1 == 1 {
                    for dy in 0..scale {
                        for dx in 0..scale {
                            let px = ox + col as i32 * scale + dx;
                            let py = y + row as i32 * scale + dy;
                            if let Some(sc) = stroke_c {
                                for sdx in -1..=1 {
                                    for sdy in -1..=1 {
                                        if sdx == 0 && sdy == 0 { continue; }
                                        canvas.blend_pixel(px + sdx, py + sdy, sc);
                                    }
                                }
                            }
                            canvas.blend_pixel(px, py, c);
                        }
                    }
                }
            }
        }
    }
    set_canvas(&handle, canvas);
    Ok(None)
}

fn get_glyph_5x7(ch: char) -> [u8; 7] {
    let idx = ch as usize;
    if idx < 32 || idx > 126 {
        return FONT_5X7[0];
    }
    FONT_5X7[idx - 32]
}

// ==================== 画布特效 ====================

/// 画布.灰度 handle$
pub fn canvas_grayscale(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let len = canvas.pixels.len();
    for i in (0..len).step_by(4) {
        let r = canvas.pixels[i] as f64;
        let g = canvas.pixels[i + 1] as f64;
        let b = canvas.pixels[i + 2] as f64;
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
        canvas.pixels[i] = gray;
        canvas.pixels[i + 1] = gray;
        canvas.pixels[i + 2] = gray;
    }
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 画布.马赛克 handle [blockSize]$
pub fn canvas_mosaic_all(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let block_size: u32 = args.get(2)
        .and_then(|s| parse_i32(s))
        .map(|v| v.max(1) as u32)
        .unwrap_or_else(|| (canvas.size as u32).max(8));

    let cw = canvas.width;
    let ch = canvas.height;
    mosaic_region(&mut canvas, 0, 0, cw, ch, block_size);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.马赛克 handle x y w h$
pub fn draw_mosaic(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: i32 = get_arg_i32(args, 2, 0);
    let y: i32 = get_arg_i32(args, 3, 0);
    let w: i32 = get_arg_i32(args, 4, 10);
    let h: i32 = get_arg_i32(args, 5, 10);
    let block_size: u32 = (canvas.size as u32).max(8);

    let x = clamp(x, 0, canvas.width as i32);
    let y = clamp(y, 0, canvas.height as i32);
    let x2 = clamp(x + w, x, canvas.width as i32);
    let y2 = clamp(y + h, y, canvas.height as i32);

    mosaic_region(&mut canvas, x as u32, y as u32, (x2 - x) as u32, (y2 - y) as u32, block_size);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.高斯模糊 handle x y w h$
pub fn draw_gaussian_blur(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: i32 = get_arg_i32(args, 2, 0);
    let y: i32 = get_arg_i32(args, 3, 0);
    let w: i32 = get_arg_i32(args, 4, 10);
    let h: i32 = get_arg_i32(args, 5, 10);

    if w <= 0 || h <= 0 {
        return Err("模糊区域宽高必须大于0".into());
    }

    let x = clamp(x, 0, canvas.width as i32) as u32;
    let y = clamp(y, 0, canvas.height as i32) as u32;
    let x2 = clamp(x as i32 + w, x as i32, canvas.width as i32) as u32;
    let y2 = clamp(y as i32 + h, y as i32, canvas.height as i32) as u32;
    let r: i32 = (canvas.size as i32).max(1).min(10);

    let ow = canvas.width as usize;
    let rw = (x2 - x) as usize;
    let rh = (y2 - y) as usize;
    let px_count = rw * rh;

    // 第一步：分离式盒模糊 —— 前缀和 O(W*H)，原算法 O(W*H*r²)
    let mut buf_a = vec![0u32; px_count * 4];
    let mut buf_b = vec![0u32; px_count * 4];

    // 拷贝区域像素
    for py in y..y2 {
        for px in x..x2 {
            let si = (py as usize * ow + px as usize) * 4;
            let di = ((py - y) as usize * rw + (px - x) as usize) * 4;
            for c in 0..4 {
                buf_a[di + c] = canvas.pixels[si + c] as u32;
            }
        }
    }

    // 水平方向模糊: buf_a → buf_b
    let mut pref = Vec::with_capacity(rw.max(rh) + 1);
    for row in 0..rh {
        let ro = row * rw;
        for c in 0..4 {
            pref.clear();
            pref.push(0);
            for col in 0..rw {
                pref.push(pref[col] + buf_a[(ro + col) * 4 + c]);
            }
            for col in 0..rw {
                let x1 = (col as i32 - r).max(0) as usize;
                let x2 = (col as i32 + r).min(rw as i32 - 1) as usize;
                let count = (x2 - x1 + 1) as u32;
                let di = (ro + col) * 4 + c;
                buf_b[di] = (pref[x2 + 1] - pref[x1]) / count;
            }
        }
    }

    // 垂直方向模糊: buf_b → buf_a
    for col in 0..rw {
        for c in 0..4 {
            pref.clear();
            pref.push(0);
            for row in 0..rh {
                pref.push(pref[row] + buf_b[(row * rw + col) * 4 + c]);
            }
            for row in 0..rh {
                let y1 = (row as i32 - r).max(0) as usize;
                let y2 = (row as i32 + r).min(rh as i32 - 1) as usize;
                let count = (y2 - y1 + 1) as u32;
                let di = (row * rw + col) * 4 + c;
                buf_a[di] = (pref[y2 + 1] - pref[y1]) / count;
            }
        }
    }

    // 写回画布
    for py in y..y2 {
        for px in x..x2 {
            let si = ((py - y) as usize * rw + (px - x) as usize) * 4;
            let di = (py as usize * ow + px as usize) * 4;
            for c in 0..4 {
                canvas.pixels[di + c] = buf_a[si + c] as u8;
            }
        }
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

/// 90° 快速旋转
fn rotate_90(pixels: &[u8], ow: usize, oh: usize, bg: [u8; 4]) -> Vec<u8> {
    let nw = oh;
    let nh = ow;
    let mut new_pixels = Vec::with_capacity(nw * nh * 4);
    for _ in 0..nw * nh {
        new_pixels.extend_from_slice(&bg);
    }
    for sy in 0..oh {
        for sx in 0..ow {
            let si = (sy * ow + sx) * 4;
            let alpha = pixels[si + 3];
            if alpha == 0 { continue; }
            let dx = oh - 1 - sy;
            let dy = sx;
            let di = (dy * nw + dx) * 4;
            new_pixels[di] = pixels[si];
            new_pixels[di + 1] = pixels[si + 1];
            new_pixels[di + 2] = pixels[si + 2];
            new_pixels[di + 3] = alpha;
        }
    }
    new_pixels
}

/// 180° 快速旋转
fn rotate_180(pixels: &[u8], ow: usize, oh: usize, bg: [u8; 4]) -> Vec<u8> {
    let mut new_pixels = Vec::with_capacity(ow * oh * 4);
    for _ in 0..ow * oh {
        new_pixels.extend_from_slice(&bg);
    }
    for sy in 0..oh {
        for sx in 0..ow {
            let si = (sy * ow + sx) * 4;
            let alpha = pixels[si + 3];
            if alpha == 0 { continue; }
            let dx = ow - 1 - sx;
            let dy = oh - 1 - sy;
            let di = (dy * ow + dx) * 4;
            new_pixels[di] = pixels[si];
            new_pixels[di + 1] = pixels[si + 1];
            new_pixels[di + 2] = pixels[si + 2];
            new_pixels[di + 3] = alpha;
        }
    }
    new_pixels
}

/// 270° 快速旋转
fn rotate_270(pixels: &[u8], ow: usize, oh: usize, bg: [u8; 4]) -> Vec<u8> {
    let nw = oh;
    let nh = ow;
    let mut new_pixels = Vec::with_capacity(nw * nh * 4);
    for _ in 0..nw * nh {
        new_pixels.extend_from_slice(&bg);
    }
    for sy in 0..oh {
        for sx in 0..ow {
            let si = (sy * ow + sx) * 4;
            let alpha = pixels[si + 3];
            if alpha == 0 { continue; }
            let dx = sy;
            let dy = ow - 1 - sx;
            let di = (dy * nw + dx) * 4;
            new_pixels[di] = pixels[si];
            new_pixels[di + 1] = pixels[si + 1];
            new_pixels[di + 2] = pixels[si + 2];
            new_pixels[di + 3] = alpha;
        }
    }
    new_pixels
}

/// 画布.旋转 handle degrees [bgColor]$
pub fn canvas_rotate(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let deg: f64 = get_arg_f64(args, 2, 0.0);
    if deg == 0.0 {
        return Ok(None);
    }
    let bg = args.get(3).and_then(|s| parse_color(s)).unwrap_or([0, 0, 0, 0]);

    let ow = canvas.width as usize;
    let oh = canvas.height as usize;

    // 90° 倍数快速路径 — 无需三角函数
    let deg_norm = (deg % 360.0 + 360.0) % 360.0;
    let deg_r = (deg_norm * 1000.0).round() / 1000.0;
    if deg_r == 90.0 {
        canvas.pixels = rotate_90(&canvas.pixels, ow, oh, bg);
        canvas.width = oh as u32;
        canvas.height = ow as u32;
        set_canvas(&handle, canvas);
        return Ok(None);
    }
    if deg_r == 180.0 {
        canvas.pixels = rotate_180(&canvas.pixels, ow, oh, bg);
        set_canvas(&handle, canvas);
        return Ok(None);
    }
    if deg_r == 270.0 {
        canvas.pixels = rotate_270(&canvas.pixels, ow, oh, bg);
        canvas.width = oh as u32;
        canvas.height = ow as u32;
        set_canvas(&handle, canvas);
        return Ok(None);
    }

    let rad = deg_norm.to_radians();
    let cos = rad.cos() as f32;
    let sin = rad.sin() as f32;

    let ow_i = ow as i32;
    let oh_i = oh as i32;

    // 计算旋转后包围盒
    let corners = [(0, 0), (ow_i, 0), (ow_i, oh_i), (0, oh_i)];
    let mut min_x = f32::MAX; let mut max_x = f32::MIN;
    let mut min_y = f32::MAX; let mut max_y = f32::MIN;
    for (cx, cy) in &corners {
        let cx = *cx as f32;
        let cy = *cy as f32;
        let rx = cx * cos - cy * sin;
        let ry = cx * sin + cy * cos;
        min_x = min_x.min(rx); max_x = max_x.max(rx);
        min_y = min_y.min(ry); max_y = max_y.max(ry);
    }
    let nw = (max_x - min_x).ceil() as usize;
    let nh = (max_y - min_y).ceil() as usize;

    // 用背景色填充新画布
    let new_len = nw * nh;
    let mut new_pixels = Vec::with_capacity(new_len * 4);
    for _ in 0..new_len {
        new_pixels.extend_from_slice(&bg);
    }

    let off_x = -min_x;
    let off_y = -min_y;

    // 反向映射 + 增量计算 — 每像素只需一次加法，无需三角函数
    // 逆旋转：sx = (dx-off_x)*cos + (dy-off_y)*sin,  sy = -(dx-off_x)*sin + (dy-off_y)*cos
    // 每 dx+1: sx+=cos, sy-=sin
    for dy in 0..nh {
        let row_base = dy as f32 - off_y;
        let mut sx = -off_x * cos + row_base * sin;
        let mut sy = off_x * sin + row_base * cos;
        let row_off = dy * nw;

        for dx in 0..nw {
            if sx >= 0.0 && sy >= 0.0 {
                let six = sx as usize;
                let siy = sy as usize;
                if six < ow && siy < oh {
                    let si = (siy * ow + six) * 4;
                    let alpha = canvas.pixels[si + 3];
                    if alpha != 0 {
                        let di = (row_off + dx) * 4;
                        new_pixels[di] = canvas.pixels[si];
                        new_pixels[di + 1] = canvas.pixels[si + 1];
                        new_pixels[di + 2] = canvas.pixels[si + 2];
                        new_pixels[di + 3] = alpha;
                    }
                }
            }
            sx += cos;
            sy -= sin;
        }
    }

    canvas.width = nw as u32;
    canvas.height = nh as u32;
    canvas.pixels = new_pixels;
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 画布.圆形 handle radius [bgColor]$
pub fn canvas_round_corners(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let radius: i32 = get_arg_i32(args, 2, 0);
    if radius <= 0 {
        return Ok(None);
    }
    let bg = args.get(3).and_then(|s| parse_color(s)).unwrap_or([0, 0, 0, 0]);

    let w = canvas.width as i32;
    let h = canvas.height as i32;

    for py in 0..h {
        for px in 0..w {
            if !in_rounded_rect(px, py, w, h, radius) {
                canvas.set_pixel(px as u32, py as u32, bg);
            }
        }
    }
    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制辅助函数 ====================

fn draw_line_simple(canvas: &mut CanvasData, x1: i32, y1: i32, x2: i32, y2: i32, c: [u8; 4]) {
    let dx = (x2 - x1).abs();
    let dy = -(y2 - y1).abs();
    let sx = if x1 < x2 { 1 } else { -1 };
    let sy = if y1 < y2 { 1 } else { -1 };
    let mut err = dx + dy;
    let (mut x, mut y) = (x1, y1);

    loop {
        canvas.blend_pixel(x, y, c);
        if x == x2 && y == y2 { break; }
        let e2 = 2 * err;
        if e2 >= dy { err += dy; x += sx; }
        if e2 <= dx { err += dx; y += sy; }
    }
}

fn draw_thick_line(canvas: &mut CanvasData, x1: i32, y1: i32, x2: i32, y2: i32, thickness: i32, c: [u8; 4]) {
    if thickness <= 1 {
        draw_line_simple(canvas, x1, y1, x2, y2, c);
        return;
    }
    let dx = (x2 - x1) as f64;
    let dy = (y2 - y1) as f64;
    let length = (dx * dx + dy * dy).sqrt();
    if length == 0.0 {
        let half = thickness / 2;
        for tx in -half..=half {
            for ty in -half..=half {
                canvas.blend_pixel(x1 + tx, y1 + ty, c);
            }
        }
        return;
    }
    let px = -dy / length;
    let py = dx / length;
    let half = thickness as f64 / 2.0;
    let mut t = -half;
    while t <= half + 0.001 {
        let ox = (px * t).round() as i32;
        let oy = (py * t).round() as i32;
        draw_line_simple(canvas, x1 + ox, y1 + oy, x2 + ox, y2 + oy, c);
        t += 0.5;
    }
}

fn parse_radii(arg: Option<&String>) -> [f64; 4] {
    let s = match arg {
        Some(s) => s.as_str(),
        None => return [0.0; 4],
    };
    if let Ok(r) = s.trim().parse::<f64>() {
        return [r, r, r, r];
    }
    let parts: Vec<f64> = s.split(',')
        .filter_map(|p| p.trim().parse::<f64>().ok())
        .collect();
    match parts.len() {
        0 => [0.0; 4],
        1 => [parts[0]; 4],
        2 => [parts[0], parts[1], parts[0], parts[1]],
        3 => [parts[0], parts[1], parts[2], parts[0]],
        _ => [parts[0], parts[1], parts[2], parts[3]],
    }
}

fn draw_rounded_rect_fill(canvas: &mut CanvasData, x: f64, y: f64, w: f64, h: f64, radii: [f64; 4], c: [u8; 4]) {
    let x0 = x;
    let y0 = y;
    let x1 = x + w;
    let y1 = y + h;
    let mut r = radii;
    for i in 0..4 {
        if r[i] * 2.0 > w { r[i] = w / 2.0; }
        if r[i] * 2.0 > h { r[i] = h / 2.0; }
    }
    let (r0, r1, r2, r3) = (r[0], r[1], r[2], r[3]);

    let ix0 = x0.ceil() as i32;
    let iy0 = y0.ceil() as i32;
    let ix1 = x1.floor() as i32;
    let iy1 = y1.floor() as i32;

    for py in iy0..=iy1 {
        for px in ix0..=ix1 {
            let fx = px as f64;
            let fy = py as f64;
            let inside = if fx < x0 + r0 && fy < y0 + r0 {
                dist(fx, fy, x0 + r0, y0 + r0) <= r0
            } else if fx > x1 - r1 && fy < y0 + r1 {
                dist(fx, fy, x1 - r1, y0 + r1) <= r1
            } else if fx > x1 - r2 && fy > y1 - r2 {
                dist(fx, fy, x1 - r2, y1 - r2) <= r2
            } else if fx < x0 + r3 && fy > y1 - r3 {
                dist(fx, fy, x0 + r3, y1 - r3) <= r3
            } else if fx >= x0 && fx <= x1 && fy >= y0 && fy <= y1 {
                true
            } else {
                false
            };
            if inside {
                canvas.blend_pixel(px, py, c);
            }
        }
    }
}

fn draw_rounded_rect_stroke(canvas: &mut CanvasData, x: f64, y: f64, w: f64, h: f64, radii: [f64; 4], c: [u8; 4], thickness: f64) {
    let t = thickness as i32;
    if t <= 1 {
        draw_rounded_rect_outline(canvas, x, y, w, h, radii, c);
        return;
    }
    for dx in 0..t {
        let offset = dx as f64 - (t as f64 - 1.0) / 2.0;
        draw_rounded_rect_outline(canvas, x + offset, y + offset, w - offset * 2.0, h - offset * 2.0, radii, c);
    }
}

fn draw_rounded_rect_outline(canvas: &mut CanvasData, x: f64, y: f64, w: f64, h: f64, radii: [f64; 4], c: [u8; 4]) {
    let mut r = radii;
    for i in 0..4 {
        if r[i] * 2.0 > w { r[i] = w / 2.0; }
        if r[i] * 2.0 > h { r[i] = h / 2.0; }
    }
    let (r0, r1, r2, r3) = (r[0], r[1], r[2], r[3]);

    let ix0 = x.ceil() as i32;
    let iy0 = y.ceil() as i32;
    let ix1 = (x + w).floor() as i32;
    let iy1 = (y + h).floor() as i32;

    let span = 2.0;

    for py in iy0..=iy1 {
        for px in ix0..=ix1 {
            let fx = px as f64;
            let fy = py as f64;
            let on_edge = if fx < x + r0 && fy < y + r0 {
                let d = dist(fx, fy, x + r0, y + r0);
                d >= r0 - span && d <= r0 + span
            } else if fx > x + w - r1 && fy < y + r1 {
                let d = dist(fx, fy, x + w - r1, y + r1);
                d >= r1 - span && d <= r1 + span
            } else if fx > x + w - r2 && fy > y + h - r2 {
                let d = dist(fx, fy, x + w - r2, y + h - r2);
                d >= r2 - span && d <= r2 + span
            } else if fx < x + r3 && fy > y + h - r3 {
                let d = dist(fx, fy, x + r3, y + h - r3);
                d >= r3 - span && d <= r3 + span
            } else if fx >= x && fx <= x + w && fy >= y && fy <= y + h {
                fx <= x + span || fx >= x + w - span || fy <= y + span || fy >= y + h - span
            } else {
                false
            };
            if on_edge {
                canvas.blend_pixel(px, py, c);
            }
        }
    }
}

fn draw_ellipse_path(canvas: &mut CanvasData, x: f64, y: f64, w: f64, h: f64, c: [u8; 4], thickness: f64, fill: bool) {
    let cx = x + w / 2.0;
    let cy = y + h / 2.0;
    let rx = w / 2.0;
    let ry = h / 2.0;
    let rx2 = rx * rx;
    let ry2 = ry * ry;

    let ix0 = x.floor() as i32 - 1;
    let iy0 = y.floor() as i32 - 1;
    let ix1 = (x + w).ceil() as i32 + 1;
    let iy1 = (y + h).ceil() as i32 + 1;

    for py in iy0..=iy1 {
        for px in ix0..=ix1 {
            let dx = px as f64 - cx;
            let dy = py as f64 - cy;
            let val = (dx * dx) / rx2 + (dy * dy) / ry2;
            if fill {
                if val <= 1.0 {
                    canvas.blend_pixel(px, py, c);
                }
            } else {
                let t = thickness.max(1.0);
                let inner = (dx * dx) / ((rx - t).max(0.5) * (rx - t).max(0.5))
                    + (dy * dy) / ((ry - t).max(0.5) * (ry - t).max(0.5));
                if val <= 1.0 && inner >= 1.0 {
                    canvas.blend_pixel(px, py, c);
                }
            }
        }
    }
}

fn draw_pie_path(canvas: &mut CanvasData, cx: f64, cy: f64, radius: f64, start_deg: f64, end_deg: f64, c: [u8; 4], thickness: f64, fill: bool) {
    let start_rad = start_deg.to_radians();
    let end_rad = end_deg.to_radians();

    let x0 = (cx - radius).floor() as i32 - 1;
    let y0 = (cy - radius).floor() as i32 - 1;
    let x1 = (cx + radius).ceil() as i32 + 1;
    let y1 = (cy + radius).ceil() as i32 + 1;

    for py in y0..=y1 {
        for px in x0..=x1 {
            let dx = px as f64 - cx;
            let dy = py as f64 - cy;
            let dist = (dx * dx + dy * dy).sqrt();
            if dist > radius { continue; }

            let angle = dy.atan2(dx);
            let in_angle = if start_rad <= end_rad {
                angle >= start_rad && angle <= end_rad
            } else {
                angle >= start_rad || angle <= end_rad
            };

            if !in_angle { continue; }

            if fill {
                canvas.blend_pixel(px, py, c);
            } else {
                let t = thickness.max(1.0);
                if dist >= radius - t && dist <= radius {
                    canvas.blend_pixel(px, py, c);
                }
                if dist <= radius {
                    let near_start = (angle - start_rad).abs() < 0.05 || (angle - start_rad + 2.0 * std::f64::consts::PI).abs() < 0.05;
                    let near_end = (angle - end_rad).abs() < 0.05 || (angle - end_rad + 2.0 * std::f64::consts::PI).abs() < 0.05;
                    if near_start || near_end {
                        canvas.blend_pixel(px, py, c);
                    }
                }
            }
        }
    }
}

fn draw_arc_path(canvas: &mut CanvasData, cx: f64, cy: f64, radius: f64, start_deg: f64, end_deg: f64, c: [u8; 4], thickness: f64) {
    let start_rad = start_deg.to_radians();
    let end_rad = end_deg.to_radians();
    let t = thickness.max(1.0);

    let x0 = (cx - radius).floor() as i32 - 1;
    let y0 = (cy - radius).floor() as i32 - 1;
    let x1 = (cx + radius).ceil() as i32 + 1;
    let y1 = (cy + radius).ceil() as i32 + 1;

    for py in y0..=y1 {
        for px in x0..=x1 {
            let dx = px as f64 - cx;
            let dy = py as f64 - cy;
            let dist = (dx * dx + dy * dy).sqrt();
            if dist >= radius - t && dist <= radius {
                let angle = dy.atan2(dx);
                let in_angle = if start_rad <= end_rad {
                    angle >= start_rad && angle <= end_rad
                } else {
                    angle >= start_rad || angle <= end_rad
                };
                if in_angle {
                    canvas.blend_pixel(px, py, c);
                }
            }
        }
    }
}

fn dist(x1: f64, y1: f64, x2: f64, y2: f64) -> f64 {
    ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)).sqrt()
}

fn in_rounded_rect(x: i32, y: i32, w: i32, h: i32, r: i32) -> bool {
    if x < r && y < r {
        dist(x as f64, y as f64, r as f64, r as f64) <= r as f64
    } else if x >= w - r && y < r {
        dist(x as f64, y as f64, (w - r - 1) as f64, r as f64) <= r as f64
    } else if x < r && y >= h - r {
        dist(x as f64, y as f64, r as f64, (h - r - 1) as f64) <= r as f64
    } else if x >= w - r && y >= h - r {
        dist(x as f64, y as f64, (w - r - 1) as f64, (h - r - 1) as f64) <= r as f64
    } else {
        true
    }
}

fn clamp<T: PartialOrd>(v: T, lo: T, hi: T) -> T {
    if v < lo { lo } else if v > hi { hi } else { v }
}

fn mosaic_region(canvas: &mut CanvasData, x: u32, y: u32, w: u32, h: u32, block_size: u32) {
    let bw = canvas.width;
    let mut by = y;
    while by < y + h {
        let mut bx = x;
        let outer_y_end = (by + block_size).min(y + h);
        while bx < x + w {
            let x_end = (bx + block_size).min(x + w);

            let mut sum = [0u64; 4];
            let mut count = 0u64;
            for py in by..outer_y_end {
                for px in bx..x_end {
                    let i = (py as usize * bw as usize + px as usize) * 4;
                    for k in 0..4 { sum[k] += canvas.pixels[i + k] as u64; }
                    count += 1;
                }
            }
            if count > 0 {
                let avg = [
                    (sum[0] / count) as u8,
                    (sum[1] / count) as u8,
                    (sum[2] / count) as u8,
                    (sum[3] / count) as u8,
                ];
                for py in by..outer_y_end {
                    for px in bx..x_end {
                        canvas.set_pixel(px, py, avg);
                    }
                }
            }
            bx = x_end;
        }
        by = outer_y_end;
    }
}

// ==================== 绘制.喷漆 ====================

/// 绘制.喷漆 handle x1 y1 x2 y2 [rangeRadius] [density] [color] [pointRadius]$
pub fn draw_brush_line(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x1: f64 = get_arg_f64(args, 2, 0.0);
    let y1: f64 = get_arg_f64(args, 3, 0.0);
    let x2: f64 = get_arg_f64(args, 4, 0.0);
    let y2: f64 = get_arg_f64(args, 5, 0.0);

    let range_radius: i32 = args.get(6).and_then(|s| parse_i32(s))
        .filter(|&v| v > 0)
        .unwrap_or_else(|| (canvas.size as i32).max(3));

    let density: i32 = args.get(7).and_then(|s| parse_i32(s))
        .unwrap_or(50)
        .clamp(1, 100);

    let c = get_draw_color(args, 8, &canvas);

    let point_radius: i32 = args.get(9).and_then(|s| parse_i32(s))
        .filter(|&v| v > 0)
        .unwrap_or(1);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = (dx * dx + dy * dy).sqrt();
    let steps = (length as i32).max(1);

    let prob = density as f64 / 100.0;

    let mut seed = simple_seed();
    let mut next_rand = || -> i32 {
        seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
        (seed & 0x00FFFFFF) as i32
    };

    for i in 0..=steps {
        let t = i as f64 / steps as f64;
        let cx = (x1 + t * dx) as i32;
        let cy = (y1 + t * dy) as i32;

        if density == 100 {
            for ox in -range_radius..=range_radius {
                for oy in -range_radius..=range_radius {
                    if ox * ox + oy * oy <= range_radius * range_radius {
                        draw_filled_circle_on(&mut canvas, cx + ox, cy + oy, point_radius, c);
                    }
                }
            }
        } else {
            let r = next_rand();
            let prob_val = ((r as u32) & 0x00FFFFFF) as f64 / 16777216.0;
            if prob_val < prob {
                let points_count = (density * 20 / 100).max(1);
                for _ in 0..points_count {
                    let offset_x = next_rand() % (range_radius * 2 + 1) - range_radius;
                    let offset_y = next_rand() % (range_radius * 2 + 1) - range_radius;
                    draw_filled_circle_on(&mut canvas, cx + offset_x, cy + offset_y, point_radius, c);
                }
            }
        }
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

fn draw_filled_circle_on(canvas: &mut CanvasData, cx: i32, cy: i32, r: i32, c: [u8; 4]) {
    for dy in -r..=r {
        for dx in -r..=r {
            if dx * dx + dy * dy <= r * r {
                canvas.blend_pixel(cx + dx, cy + dy, c);
            }
        }
    }
}

// ==================== 绘制.波浪 ====================

/// 绘制.波浪 handle x1 y1 x2 y2 [amplitude] [wavelength] [step]$
pub fn draw_wave_line(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x1: f64 = get_arg_f64(args, 2, 0.0);
    let y1: f64 = get_arg_f64(args, 3, 0.0);
    let x2: f64 = get_arg_f64(args, 4, 0.0);
    let y2: f64 = get_arg_f64(args, 5, 0.0);

    let wave_amplitude: f64 = get_arg_f64(args, 6, 5.0);
    let wave_length: f64 = get_arg_f64(args, 7, 20.0);
    let step: f64 = args.get(8).and_then(|s| parse_f64(s))
        .filter(|&v| v > 0.0)
        .unwrap_or(2.0);

    let c = canvas.color;
    let thickness = (canvas.size as f64).max(1.0);

    let dx = x2 - x1;
    let dy = y2 - y1;
    let length = (dx * dx + dy * dy).sqrt();
    let angle = dy.atan2(dx);

    let mut prev_px = 0i32;
    let mut prev_py = 0i32;
    let mut first = true;

    let mut t = 0.0;
    while t <= length + 0.001 {
        let base_x = x1 + angle.cos() * t;
        let base_y = y1 + angle.sin() * t;
        let offset = wave_amplitude * (2.0 * std::f64::consts::PI * t / wave_length).sin();
        let normal_angle = angle + std::f64::consts::PI / 2.0;
        let wave_x = base_x + normal_angle.cos() * offset;
        let wave_y = base_y + normal_angle.sin() * offset;

        let px = wave_x.round() as i32;
        let py = wave_y.round() as i32;

        if first {
            first = false;
        } else {
            draw_thick_line(&mut canvas, prev_px, prev_py, px, py, thickness as i32, c);
        }
        prev_px = px;
        prev_py = py;
        t += step;
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制.油漆桶 ====================

/// 绘制.油漆桶 handle x y [fillColor]$
pub fn draw_flood_fill(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let x: i32 = get_arg_i32(args, 2, 0);
    let y: i32 = get_arg_i32(args, 3, 0);
    let fill_color = get_draw_color(args, 4, &canvas);

    if !canvas.in_bounds(x, y) {
        return Err("起始点不在图像范围内".into());
    }

    let start_color = canvas.get_pixel(x as u32, y as u32);
    if start_color == fill_color {
        return Ok(None);
    }

    // BFS 洪水填充 — 直接操作像素数组，无需已访问标记数组
    use std::collections::VecDeque;
    let w = canvas.width as usize;
    let w_i = canvas.width as i32;
    let h_i = canvas.height as i32;
    let pixels = &mut canvas.pixels;
    let mut queue = VecDeque::with_capacity(1024);

    // 填充起点 = 标记已访问
    let si = (y as usize * w + x as usize) * 4;
    pixels[si] = fill_color[0];
    pixels[si + 1] = fill_color[1];
    pixels[si + 2] = fill_color[2];
    pixels[si + 3] = fill_color[3];
    queue.push_back((x, y));

    let sc = (start_color[0], start_color[1], start_color[2], start_color[3]);

    while let Some((px, py)) = queue.pop_front() {
        for (nx, ny) in [(px + 1, py), (px - 1, py), (px, py + 1), (px, py - 1)] {
            if nx >= 0 && ny >= 0 && nx < w_i && ny < h_i {
                let ni = (ny as usize * w + nx as usize) * 4;
                // 像素仍为起始颜色 = 未访问 → 填充并入队
                if pixels[ni] == sc.0
                    && pixels[ni + 1] == sc.1
                    && pixels[ni + 2] == sc.2
                    && pixels[ni + 3] == sc.3
                {
                    pixels[ni] = fill_color[0];
                    pixels[ni + 1] = fill_color[1];
                    pixels[ni + 2] = fill_color[2];
                    pixels[ni + 3] = fill_color[3];
                    queue.push_back((nx, ny));
                }
            }
        }
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制.随机点 ====================

/// 绘制.随机点 handle [dotCount]$
pub fn draw_random_dots(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let dot_count: usize = args.get(2).and_then(|s| parse_i32(s))
        .filter(|&v| v > 0)
        .unwrap_or(20) as usize;

    let radius = (canvas.size as i32).max(1);
    let w = canvas.width as i32;
    let h = canvas.height as i32;

    let mut seed = simple_seed();
    let mut rand_coord = |lo: i32, hi: i32| -> i32 {
        seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
        lo + (((seed >> 16) as i32).unsigned_abs() % (hi - lo) as u32) as i32
    };

    for _ in 0..dot_count {
        let c = canvas.color; // 用当前画笔颜色（支持随机色）
        let x = rand_coord(0, w);
        let y = rand_coord(0, h);
        draw_filled_circle_on(&mut canvas, x, y, radius, c);
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制.随机线条 ====================

/// 绘制.随机线条 handle [lineCount]$
pub fn draw_random_lines(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;
    let line_count: usize = args.get(2).and_then(|s| parse_i32(s))
        .filter(|&v| v > 0)
        .unwrap_or(20) as usize;

    let thickness = (canvas.size as i32).max(1);
    let w = canvas.width as i32;
    let h = canvas.height as i32;

    let mut seed = simple_seed();
    let mut rand_coord = |lo: i32, hi: i32| -> i32 {
        seed = seed.wrapping_mul(1664525).wrapping_add(1013904223);
        lo + (((seed >> 16) as i32).unsigned_abs() % (hi - lo) as u32) as i32
    };

    for _ in 0..line_count {
        let c = canvas.color;
        let x1 = rand_coord(0, w);
        let y1 = rand_coord(0, h);
        let x2 = rand_coord(0, w);
        let y2 = rand_coord(0, h);
        draw_thick_line(&mut canvas, x1, y1, x2, y2, thickness, c);
    }

    set_canvas(&handle, canvas);
    Ok(None)
}

// ==================== 绘制.多边形 / 绘制.多边形描边 ====================

/// 解析 "x,y" 格式的坐标点
fn parse_points(args: &[String], start_idx: usize) -> Result<(Vec<(f64, f64)>, usize), String> {
    let mut points = Vec::new();
    let mut i = start_idx;
    while i < args.len() {
        let s = &args[i];
        // 尝试作为颜色跳过
        if parse_color(s).is_some() {
            break;
        }
        let coords: Vec<&str> = s.split(',').collect();
        if coords.len() != 2 {
            return Err(format!("参数{}格式错误，期望 x,y 格式", i + 1));
        }
        let x: f64 = coords[0].trim().parse::<f64>().map_err(|_| format!("参数{}坐标转换错误", i + 1))?;
        let y: f64 = coords[1].trim().parse::<f64>().map_err(|_| format!("参数{}坐标转换错误", i + 1))?;
        points.push((x, y));
        i += 1;
    }
    Ok((points, i))
}

/// 绘制.多边形 handle x,y x,y ... [color]$
pub fn draw_polygon(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;

    let (points, last_idx) = parse_points(args, 2)?;
    if points.len() < 3 {
        return Err("至少需要3个点".into());
    }

    let c = if last_idx < args.len() {
        get_draw_color(args, last_idx + 1, &canvas)
    } else {
        canvas.color
    };

    fill_polygon(&mut canvas, &points, c);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 绘制.多边形描边 handle x,y x,y ... [color]$
pub fn draw_polygon_stroke(args: &[String]) -> Result<Option<String>, String> {
    let (handle, mut canvas) = resolve_canvas(args)?;

    let (points, last_idx) = parse_points(args, 2)?;
    if points.len() < 2 {
        return Err("至少需要2个点".into());
    }

    let c = if last_idx < args.len() {
        get_draw_color(args, last_idx + 1, &canvas)
    } else {
        canvas.color
    };

    let thickness = (canvas.size as f64).max(1.0);
    stroke_polygon(&mut canvas, &points, c, thickness);
    set_canvas(&handle, canvas);
    Ok(None)
}

/// 多边形填充：使用扫描线算法
fn fill_polygon(canvas: &mut CanvasData, pts: &[(f64, f64)], c: [u8; 4]) {
    if pts.len() < 3 { return; }

    let mut min_y = f64::MAX;
    let mut max_y = f64::MIN;
    for &(_, y) in pts {
        if y < min_y { min_y = y; }
        if y > max_y { max_y = y; }
    }
    let y0 = min_y.floor() as i32;
    let y1 = max_y.ceil() as i32;

    let n = pts.len();
    for py in y0..=y1 {
        let mut intersections = Vec::new();
        for i in 0..n {
            let (x1, y1) = (pts[i].0, pts[i].1);
            let (x2, y2) = (pts[(i + 1) % n].0, pts[(i + 1) % n].1);
            if (y1 <= py as f64 && y2 > py as f64) || (y2 <= py as f64 && y1 > py as f64) {
                let t = (py as f64 - y1) / (y2 - y1);
                let ix = x1 + t * (x2 - x1);
                intersections.push(ix);
            }
        }
        intersections.sort_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal));
        for chunk in intersections.chunks(2) {
            if chunk.len() == 2 {
                let sx = chunk[0].ceil() as i32;
                let ex = chunk[1].floor() as i32;
                for px in sx..=ex {
                    canvas.blend_pixel(px, py, c);
                }
            }
        }
    }
}

/// 多边形描边
fn stroke_polygon(canvas: &mut CanvasData, pts: &[(f64, f64)], c: [u8; 4], thickness: f64) {
    let n = pts.len();
    let t = thickness as i32;
    for i in 0..n {
        let (x1, y1) = pts[i];
        let (x2, y2) = pts[(i + 1) % n];
        draw_thick_line(canvas, x1 as i32, y1 as i32, x2 as i32, y2 as i32, t, c);
    }
}

/// 简单伪随机种子（基于系统时间）
fn simple_seed() -> u64 {
    use std::time::{SystemTime, UNIX_EPOCH};
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos() as u64
}

// ==================== 5x7 位图字体数据 (ASCII 32-126) ====================

static FONT_5X7: [[u8; 7]; 95] = [
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x04, 0x04, 0x04, 0x04, 0x00, 0x00, 0x04],
    [0x0A, 0x0A, 0x0A, 0x00, 0x00, 0x00, 0x00],
    [0x0A, 0x0A, 0x1F, 0x0A, 0x1F, 0x0A, 0x0A],
    [0x04, 0x0F, 0x14, 0x0E, 0x05, 0x1E, 0x04],
    [0x18, 0x19, 0x02, 0x04, 0x08, 0x13, 0x03],
    [0x0C, 0x12, 0x14, 0x08, 0x15, 0x12, 0x0D],
    [0x0C, 0x04, 0x08, 0x00, 0x00, 0x00, 0x00],
    [0x02, 0x04, 0x08, 0x08, 0x08, 0x04, 0x02],
    [0x08, 0x04, 0x02, 0x02, 0x02, 0x04, 0x08],
    [0x00, 0x04, 0x15, 0x0E, 0x15, 0x04, 0x00],
    [0x00, 0x04, 0x04, 0x1F, 0x04, 0x04, 0x00],
    [0x00, 0x00, 0x00, 0x00, 0x0C, 0x04, 0x08],
    [0x00, 0x00, 0x00, 0x1F, 0x00, 0x00, 0x00],
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x0C, 0x0C],
    [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x00],
    [0x0E, 0x11, 0x13, 0x15, 0x19, 0x11, 0x0E],
    [0x04, 0x0C, 0x04, 0x04, 0x04, 0x04, 0x0E],
    [0x0E, 0x11, 0x01, 0x02, 0x04, 0x08, 0x1F],
    [0x0E, 0x11, 0x01, 0x06, 0x01, 0x11, 0x0E],
    [0x02, 0x06, 0x0A, 0x12, 0x1F, 0x02, 0x02],
    [0x1F, 0x10, 0x1E, 0x01, 0x01, 0x11, 0x0E],
    [0x06, 0x08, 0x10, 0x1E, 0x11, 0x11, 0x0E],
    [0x1F, 0x01, 0x02, 0x04, 0x08, 0x08, 0x08],
    [0x0E, 0x11, 0x11, 0x0E, 0x11, 0x11, 0x0E],
    [0x0E, 0x11, 0x11, 0x0F, 0x01, 0x02, 0x0C],
    [0x00, 0x0C, 0x0C, 0x00, 0x0C, 0x0C, 0x00],
    [0x00, 0x0C, 0x0C, 0x00, 0x0C, 0x04, 0x08],
    [0x02, 0x04, 0x08, 0x10, 0x08, 0x04, 0x02],
    [0x00, 0x00, 0x1F, 0x00, 0x1F, 0x00, 0x00],
    [0x08, 0x04, 0x02, 0x01, 0x02, 0x04, 0x08],
    [0x0E, 0x11, 0x01, 0x02, 0x04, 0x00, 0x04],
    [0x0E, 0x11, 0x17, 0x15, 0x17, 0x10, 0x0F],
    [0x04, 0x0A, 0x11, 0x11, 0x1F, 0x11, 0x11],
    [0x1E, 0x11, 0x11, 0x1E, 0x11, 0x11, 0x1E],
    [0x0E, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0E],
    [0x1C, 0x12, 0x11, 0x11, 0x11, 0x12, 0x1C],
    [0x1F, 0x10, 0x10, 0x1E, 0x10, 0x10, 0x1F],
    [0x1F, 0x10, 0x10, 0x1E, 0x10, 0x10, 0x10],
    [0x0E, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0F],
    [0x11, 0x11, 0x11, 0x1F, 0x11, 0x11, 0x11],
    [0x0E, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0E],
    [0x01, 0x01, 0x01, 0x01, 0x01, 0x11, 0x0E],
    [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
    [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1F],
    [0x11, 0x1B, 0x15, 0x15, 0x11, 0x11, 0x11],
    [0x11, 0x11, 0x19, 0x15, 0x13, 0x11, 0x11],
    [0x0E, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0E],
    [0x1E, 0x11, 0x11, 0x1E, 0x10, 0x10, 0x10],
    [0x0E, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0D],
    [0x1E, 0x11, 0x11, 0x1E, 0x14, 0x12, 0x11],
    [0x0E, 0x11, 0x10, 0x0E, 0x01, 0x11, 0x0E],
    [0x1F, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
    [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0E],
    [0x11, 0x11, 0x11, 0x11, 0x11, 0x0A, 0x04],
    [0x11, 0x11, 0x11, 0x15, 0x15, 0x15, 0x0A],
    [0x11, 0x11, 0x0A, 0x04, 0x0A, 0x11, 0x11],
    [0x11, 0x11, 0x11, 0x0A, 0x04, 0x04, 0x04],
    [0x1F, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1F],
    [0x0E, 0x08, 0x08, 0x08, 0x08, 0x08, 0x0E],
    [0x00, 0x10, 0x08, 0x04, 0x02, 0x01, 0x00],
    [0x0E, 0x02, 0x02, 0x02, 0x02, 0x02, 0x0E],
    [0x04, 0x0A, 0x11, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1F],
    [0x08, 0x04, 0x02, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0x00, 0x0E, 0x01, 0x0F, 0x11, 0x0F],
    [0x10, 0x10, 0x1E, 0x11, 0x11, 0x11, 0x1E],
    [0x00, 0x00, 0x0E, 0x11, 0x10, 0x11, 0x0E],
    [0x01, 0x01, 0x0F, 0x11, 0x11, 0x11, 0x0F],
    [0x00, 0x00, 0x0E, 0x11, 0x1F, 0x10, 0x0E],
    [0x06, 0x09, 0x08, 0x1C, 0x08, 0x08, 0x08],
    [0x00, 0x00, 0x0F, 0x11, 0x0F, 0x01, 0x0E],
    [0x10, 0x10, 0x16, 0x19, 0x11, 0x11, 0x11],
    [0x04, 0x00, 0x0C, 0x04, 0x04, 0x04, 0x0E],
    [0x02, 0x00, 0x06, 0x02, 0x02, 0x12, 0x0C],
    [0x10, 0x10, 0x12, 0x14, 0x18, 0x14, 0x12],
    [0x0C, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0E],
    [0x00, 0x00, 0x1A, 0x15, 0x15, 0x11, 0x11],
    [0x00, 0x00, 0x16, 0x19, 0x11, 0x11, 0x11],
    [0x00, 0x00, 0x0E, 0x11, 0x11, 0x11, 0x0E],
    [0x00, 0x00, 0x1E, 0x11, 0x1E, 0x10, 0x10],
    [0x00, 0x00, 0x0F, 0x11, 0x0F, 0x01, 0x01],
    [0x00, 0x00, 0x16, 0x19, 0x10, 0x10, 0x10],
    [0x00, 0x00, 0x0E, 0x10, 0x0E, 0x01, 0x1E],
    [0x08, 0x08, 0x1C, 0x08, 0x08, 0x09, 0x06],
    [0x00, 0x00, 0x11, 0x11, 0x11, 0x13, 0x0D],
    [0x00, 0x00, 0x11, 0x11, 0x11, 0x0A, 0x04],
    [0x00, 0x00, 0x11, 0x11, 0x15, 0x15, 0x0A],
    [0x00, 0x00, 0x11, 0x0A, 0x04, 0x0A, 0x11],
    [0x00, 0x00, 0x11, 0x11, 0x0F, 0x01, 0x0E],
    [0x00, 0x00, 0x1F, 0x02, 0x04, 0x08, 0x1F],
    [0x02, 0x04, 0x04, 0x08, 0x04, 0x04, 0x02],
    [0x04, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
    [0x08, 0x04, 0x04, 0x02, 0x04, 0x04, 0x08],
    [0x00, 0x04, 0x02, 0x1F, 0x02, 0x04, 0x00],
];