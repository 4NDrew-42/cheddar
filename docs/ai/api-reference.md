# LLM API Reference

## Table of Contents
1. [Authentication](#authentication)
2. [Endpoints](#endpoints)
3. [Type Definitions](#type-definitions)
4. [Error Codes](#error-codes)
5. [Rate Limiting](#rate-limiting)
6. [Examples](#examples)

## Authentication

All API endpoints require authentication via JWT token:

```http
Authorization: Bearer <token>
```

### Token Requirements
- Issued by the authentication system
- Contains valid user roles
- Not expired

## Endpoints

### Generate Content

#### Request
```http
POST /api/ai/generate
Content-Type: application/json
Authorization: Bearer <token>

{
  "prompt": "Hello, how are you?",
  "provider": "gpt4",
  "config": {
    "maxTokens": 100,
    "temperature": 0.7
  }
}
```

#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "content": "I'm doing well, thank you! How can I assist you today?",
  "usage": {
    "promptTokens": 7,
    "completionTokens": 15,
    "totalTokens": 22
  }
}
```

### Analyze Content

#### Request
```http
POST /api/ai/analyze
Content-Type: application/json
Authorization: Bearer <token>

{
  "content": "This is a test message",
  "provider": "anthropic"
}
```

#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "analysis": {
    "sentiment": "neutral",
    "toxicity": 0.1,
    "keywords": ["test", "message"],
    "summary": "A test message",
    "language": "en"
  }
}
```

### Optimize Content

#### Request
```http
POST /api/ai/optimize
Content-Type: application/json
Authorization: Bearer <token>

{
  "content": "This is a long text that needs optimization",
  "provider": "mistral",
  "config": {
    "style": "concise"
  }
}
```

#### Response
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "optimizedContent": "Long text optimized",
  "changes": {
    "originalLength": 100,
    "optimizedLength": 50,
    "removedSections": 3
  }
}
```

## Type Definitions

### Request Types

```typescript
interface GenerateRequest {
  prompt: string;
  provider?: ProviderType;
  config?: Partial<LLMConfig>;
}

interface AnalyzeRequest {
  content: string;
  provider?: ProviderType;
  config?: Partial<AnalysisConfig>;
}

interface OptimizeRequest {
  content: string;
  provider?: ProviderType;
  config?: Partial<OptimizationConfig>;
}
```

### Response Types

```typescript
interface GenerateResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

interface AnalyzeResponse {
  analysis: AnalysisResult;
}

interface OptimizeResponse {
  optimizedContent: string;
  changes: {
    originalLength: number;
    optimizedLength: number;
    removedSections: number;
  };
}
```

## Error Codes

### Common Errors

| Code | Description |
|------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

### LLM-Specific Errors

| Code | Description |
|------|-------------|
| LLM001 | Invalid Provider |
| LLM002 | Rate Limit Exceeded |
| LLM003 | Token Limit Exceeded |
| LLM004 | Invalid Configuration |
| LLM005 | Provider Unavailable |

## Rate Limiting

### Limits
- 100 requests per minute per user
- 1000 requests per minute per IP

### Headers
- `X-RateLimit-Limit`: Total allowed requests
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Time until reset (seconds)

### Example Response
```http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 60

{
  "error": {
    "code": "LLM002",
    "message": "Rate limit exceeded",
    "retryAfter": 60
  }
}
```

## Examples

### JavaScript Example

```javascript
async function generateContent(prompt) {
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      prompt,
      provider: 'gpt4',
      config: {
        maxTokens: 100,
        temperature: 0.7
      }
    })
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}
```

### Python Example

```python
import requests

def generate_content(prompt, token):
    url = 'https://api.example.com/api/ai/generate'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token}'
    }
    data = {
        'prompt': prompt,
        'provider': 'gpt4',
        'config': {
            'maxTokens': 100,
            'temperature': 0.7
        }
    }
    
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    return response.json()
```

### cURL Example

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "prompt": "Hello, how are you?",
    "provider": "gpt4",
    "config": {
      "maxTokens": 100,
      "temperature": 0.7
    }
  }' \
  https://api.example.com/api/ai/generate
```

### Error Handling Example

```typescript
try {
  const response = await generateContent('Hello');
  console.log(response.content);
} catch (error) {
  if (error.response?.status === 429) {
    console.error('Rate limit exceeded:', error.response.data);
  } else {
    console.error('Request failed:', error);
  }
}
```

### Webhook Integration

```typescript
// Webhook handler
app.post('/webhook/llm', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    switch (event) {
      case 'content.generated':
        // Handle generated content
        break;
      case 'content.analyzed':
        // Handle analysis results
        break;
      default:
        return res.status(400).json({ error: 'Unknown event type' });
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Batch Processing

```typescript
async function processBatch(prompts: string[]) {
  const queue = new Queue('llm-batch', {
    connection: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
  });

  const jobs = prompts.map((prompt) => ({
    name: 'generate-content',
    data: { prompt },
    opts: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    },
  }));

  await queue.addBulk(jobs);

  return queue;
}
```

### Monitoring Integration

```typescript
// Track API usage
function trackUsage(response: GenerateResponse) {
  metrics.track('llm_usage', {
    provider: 'gpt4',
    promptTokens: response.usage.promptTokens,
    completionTokens: response.usage.completionTokens,
    totalTokens: response.usage.totalTokens,
  });
}