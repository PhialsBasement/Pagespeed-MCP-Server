[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/phialsbasement-pagespeed-mcp-server-badge.png)](https://mseep.ai/app/phialsbasement-pagespeed-mcp-server)

# PageSpeed MCP Server
[![smithery badge](https://smithery.ai/badge/mcp-pagespeed-server)](https://smithery.ai/server/mcp-pagespeed-server)

A Model Context Protocol (MCP) server that extends AI assistant capabilities with PageSpeed Insights functionality. This server acts as a bridge between AI models and Google's PageSpeed Insights API, enabling detailed performance analysis of websites.

## Overview

The PageSpeed MCP server is designed to enhance AI assistants' capabilities by allowing them to perform comprehensive web performance analysis. When integrated, AI models can request and interpret detailed performance metrics, Core Web Vitals, and other critical web performance data for any given URL.

## Installation

### Installing via Smithery

To install PageSpeed Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-pagespeed-server):

```bash
npx -y @smithery/cli install mcp-pagespeed-server --client claude
```

### Manual Installation
```bash
npm install pagespeed-mcp-server
```

## Configuration

Add the PageSpeed MCP to your AI assistant's(claude in this case) configuration file:

```json
{
    "pagespeed": {
        "command": "node",
        "args": ["path/to/mcp-pagespeed-server/dist/index.js"]
    }
}
```

## Detailed Capabilities

### Performance Metrics Analysis
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Speed Index
- Time to First Byte (TTFB)

### Best Practices Assessment
- HTTPS usage
- JavaScript error monitoring
- Browser console warnings
- Deprecated API usage
- Image aspect ratio analysis
- Link security checks

### SEO Analysis
- Meta description validation
- Robots.txt validation
- Structured data validation
- Crawlable links verification
- Meta tags assessment
- Mobile friendliness

### Accessibility Audits
- ARIA attribute validation
- Color contrast checking
- Heading hierarchy analysis
- Alt text verification
- Focus management assessment
- Keyboard navigation testing

### Resource Optimization
- Image optimization suggestions
- JavaScript bundling analysis
- CSS optimization recommendations
- Cache policy validation
- Resource minification checks
- Render-blocking resource identification

## API Response Structure

The MCP server provides detailed JSON responses including:

```javascript
{
    "lighthouseResult": {
        "categories": {
            "performance": { /* Performance metrics */ },
            "accessibility": { /* Accessibility results */ },
            "best-practices": { /* Best practices audit */ },
            "seo": { /* SEO findings */ }
        },
        "audits": {
            // Detailed audit results for each category
        },
        "timing": {
            // Performance timing data
        },
        "stackPacks": {
            // Technology-specific advice
        }
    }
}
```

## Advanced Usage

### Custom Configuration
You can customize the PageSpeed analysis by providing additional parameters:

```json
{
    "strategy": "mobile", // or "desktop"
    "category": ["performance", "accessibility", "best-practices", "seo"],
    "locale": "en",
    "threshold": {
        "performance": 90,
        "accessibility": 100,
        "best-practices": 90,
        "seo": 90
    }
}
```

### Error Handling
The MCP server includes robust error handling for:
- Invalid URLs
- Network timeouts
- API rate limiting
- Invalid parameters
- Server-side errors

## Requirements


### Network Requirements
- Stable internet connection
- Access to Google's PageSpeed Insights API

### Platform Support
- Windows (x64, x86)
- Linux (x64)
- macOS (x64, arm64)

## Integration Examples

### Basic Integration
```javascript
const PageSpeedMCP = require('pagespeed-mcp-server');
const mcp = new PageSpeedMCP();

await mcp.analyze('https://example.com');
```

### With Custom Options
```javascript
const results = await mcp.analyze('https://example.com', {
    strategy: 'mobile',
    categories: ['performance', 'accessibility'],
    locale: 'en-US'
});
```

## Troubleshooting

### Common Issues
1. Connection Timeouts
   - Check internet connectivity

2. API Rate Limiting
   - Use API key for higher limits

3. Memory Issues
   - Adjust Node.js memory limits

## Development

### Building from Source
```bash
git clone https://github.com/phialsbasement/mcp-pagespeed-server
cd mcp-pagespeed-server
npm install
npm run build
```

### Running Tests
```bash
npm run test
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

### Getting Help
- GitHub Issues: Report bugs and feature requests

## License

MIT License - See LICENSE file for details
