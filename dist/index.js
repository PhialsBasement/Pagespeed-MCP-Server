#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import fetch from 'node-fetch';
// Schema definitions
const RunPageSpeedTestSchema = z.object({
    url: z.string().url(),
    strategy: z.enum(['mobile', 'desktop']).default('mobile'),
    category: z.array(z.enum([
        'accessibility',
        'best-practices',
        'performance',
        'pwa',
        'seo'
    ])).default(['performance']),
    locale: z.string().default('en'),
    apiKey: z.string().optional()
});
const server = new Server({
    name: "pagespeed-server",
    version: "0.1.0",
}, {
    capabilities: {
        tools: {},
    },
});
async function runPageSpeedTest(params) {
    const { url, strategy, category, locale, apiKey } = params;
    const effectiveApiKey = apiKey || process.env.GOOGLE_API_KEY;
    const categoriesParam = category.join('&category=');
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=${categoriesParam}&locale=${locale}${effectiveApiKey ? `&key=${effectiveApiKey}` : ''}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`PageSpeed API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}
// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "run_pagespeed_test",
                description: "Run a PageSpeed Insights test on a URL. Tests page performance, accessibility, SEO, and best practices.",
                inputSchema: zodToJsonSchema(RunPageSpeedTestSchema),
            }
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        const { name, arguments: args } = request.params;
        if (name === "run_pagespeed_test") {
            const parsed = RunPageSpeedTestSchema.safeParse(args);
            if (!parsed.success) {
                throw new Error(`Invalid arguments for run_pagespeed_test: ${parsed.error}`);
            }
            const result = await runPageSpeedTest(parsed.data);
            return {
                content: [{
                        type: "text",
                        text: JSON.stringify(result, null, 2)
                    }],
                isError: false,
            };
        }
        throw new Error(`Unknown tool: ${name}`);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
            content: [{ type: "text", text: `Error: ${errorMessage}` }],
            isError: true,
        };
    }
});
// Start server
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("PageSpeed server running on stdio");
}
runServer().catch((error) => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
