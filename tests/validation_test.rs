use ed25519_dalek::{Signer, SigningKey};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct Payload {
    data: serde_json::Value,
}

#[derive(Debug, Deserialize)]
struct ValidationRequest {
    #[serde(rename = "event_ts")]
    event_ts: String,
    #[serde(rename = "plain_token")]
    plain_token: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct ValidationResponse {
    #[serde(rename = "plain_token")]
    plain_token: String,
    signature: String,
}

/// 将 Go 的 handleValidation 转换为 Rust。
/// 对应的 Go 代码逻辑：
///   1. 读取 HTTP body，解析为 Payload
///   2. 从 Payload.Data 中解析 ValidationRequest
///   3. 用 botSecret 生成 32 字节 ed25519 种子
///   4. 签名 event_ts + plain_token
///   5. 返回 ValidationResponse (plain_token + hex 编码的签名)
fn handle_validation(body: &[u8], bot_secret: &str) -> Result<Vec<u8>, String> {
    // 解析外层 Payload
    let payload: Payload = serde_json::from_slice(body)
        .map_err(|e| format!("parse http payload err: {}", e))?;

    // 从 payload.data 中解析 ValidationRequest
    let validation_payload: ValidationRequest =
        serde_json::from_value(payload.data)
            .map_err(|e| format!("parse http payload failed: {}", e))?;

    // 生成 32 字节种子：重复 secret 直到 >= 32 字节，然后取前 32 字节
    let mut seed = bot_secret.to_string();
    while seed.len() < 32 {
        seed = seed.repeat(2);
    }
    seed.truncate(32);

    let seed_bytes: &[u8; 32] = seed
        .as_bytes()
        .try_into()
        .map_err(|_| "seed must be 32 bytes".to_string())?;

    // 从种子生成 ed25519 签名密钥
    let signing_key = SigningKey::from_bytes(seed_bytes);

    // 构造签名消息: event_ts + plain_token
    let mut msg = Vec::new();
    msg.extend_from_slice(validation_payload.event_ts.as_bytes());
    msg.extend_from_slice(validation_payload.plain_token.as_bytes());

    // 签名并 hex 编码
    let signature = signing_key.sign(&msg);
    let signature_hex = hex::encode(signature.to_bytes());

    // 构造响应
    let response = ValidationResponse {
        plain_token: validation_payload.plain_token,
        signature: signature_hex,
    };

    serde_json::to_vec(&response)
        .map_err(|e| format!("handle validation failed: {}", e))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_handle_validation_with_given_params() {
        // 测试参数
        let _appid = "11111111";
        let secret = "DG5g3B4j9X2KOErG";

        let event_ts = "1725442341";
        let plain_token = "Arq0D5A61EgUu4OxUvOp";

        // 构造请求 body
        let payload_json = serde_json::json!({
            "data": {
                "event_ts": event_ts,
                "plain_token": plain_token
            }
        });
        let body = serde_json::to_vec(&payload_json).unwrap();

        // 调用验证函数
        let result = handle_validation(&body, secret).unwrap();
        let response: ValidationResponse = serde_json::from_slice(&result).unwrap();

        // 验证 plain_token 原样返回
        assert_eq!(response.plain_token, plain_token);
        // 验证签名不为空且为合法的 hex 字符串
        assert!(!response.signature.is_empty());
        assert!(response.signature.len() == 128); // ed25519 签名为 64 字节 = 128 hex 字符
        // 验证签名只包含合法 hex 字符
        assert!(response.signature.chars().all(|c| c.is_ascii_hexdigit()));

        println!("=== 验证结果 ===");
        println!("plain_token: {}", response.plain_token);
        println!("signature:   {}", response.signature);
    }

    #[test]
    fn test_seed_generation_logic() {
        // 验证种子生成逻辑与 Go 代码一致
        let secret = "DG5g3B4j9X2KOErG"; // 16 字节
        let mut seed = secret.to_string();
        while seed.len() < 32 {
            seed = seed.repeat(2);
        }
        seed.truncate(32);

        // 16 * 2 = 32，正好等于目标长度
        assert_eq!(seed.len(), 32);
        assert_eq!(seed, "DG5g3B4j9X2KOErGDG5g3B4j9X2KOErG");
    }

    #[test]
    fn test_invalid_body_returns_error() {
        let result = handle_validation(b"not valid json", "secret");
        assert!(result.is_err());
    }

    #[test]
    fn test_missing_data_field_returns_error() {
        let payload_json = serde_json::json!({
            "wrong_field": {}
        });
        let body = serde_json::to_vec(&payload_json).unwrap();
        let result = handle_validation(&body, "secret");
        assert!(result.is_err());
    }
}
