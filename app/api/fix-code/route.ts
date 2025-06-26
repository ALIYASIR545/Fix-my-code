import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { code, language, fixType } = await req.json()

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Return a mock response when API key is not available
      return Response.json({
        success: true,
        content: generateMockAnalysis(code, language, fixType),
        usage: { totalTokens: 0 },
        isMock: true,
      })
    }

    const systemPrompt = `You are an expert code reviewer and debugger. Analyze the provided ${language} code and provide fixes and improvements.

Respond with a clear structure:
1. **FIXED CODE:** (provide the corrected code)
2. **EXPLANATION:** (explain what was wrong and how you fixed it)
3. **ISSUES FOUND:** (list specific issues)
4. **IMPROVEMENTS:** (list improvements made)
5. **SEVERITY:** (low/medium/high)

Be concise but thorough.`

    const userPrompt = `Please analyze and fix this ${language} code (Focus: ${fixType}):

\`\`\`${language}
${code}
\`\`\`

Provide the analysis in the structured format requested.`

    const result = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.1,
    })

    return Response.json({
      success: true,
      content: result.text,
      usage: result.usage,
      isMock: false,
    })
  } catch (error) {
    console.error("Error in fix-code API:", error)

    // Fallback to mock response on any error
    const { code, language, fixType } = await req.json()
    return Response.json({
      success: true,
      content: generateMockAnalysis(code, language, fixType),
      usage: { totalTokens: 0 },
      isMock: true,
    })
  }
}

function generateMockAnalysis(code: string, language: string, fixType: string): string {
  // Generate a realistic mock analysis based on common patterns
  const commonIssues = {
    javascript: ["Missing semicolons", "Unused variables", "Inconsistent indentation", "Missing error handling"],
    typescript: ["Missing type annotations", "Any type usage", "Unused imports", "Missing return type"],
    python: ["Missing docstrings", "Inconsistent naming convention", "Missing type hints", "Unused imports"],
    java: ["Missing access modifiers", "Unused variables", "Missing exception handling", "Inconsistent naming"],
  }

  const issues = commonIssues[language as keyof typeof commonIssues] || [
    "Code structure could be improved",
    "Consider adding comments",
    "Variable naming could be more descriptive",
  ]

  const improvements = [
    "Added proper error handling",
    "Improved code formatting",
    "Enhanced variable naming",
    "Added missing documentation",
  ]

  // Simple code improvements (basic formatting)
  const fixedCode = code
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n")

  return `**FIXED CODE:**
\`\`\`${language}
${fixedCode}
\`\`\`

**EXPLANATION:**
This is a demo analysis since no OpenAI API key is configured. The code has been formatted and basic improvements have been suggested. To get real AI-powered analysis, please add your OpenAI API key to the environment variables.

**ISSUES FOUND:**
- ${issues.slice(0, 3).join("\n- ")}

**IMPROVEMENTS:**
- ${improvements.slice(0, 3).join("\n- ")}

**SEVERITY:** medium

*Note: This is a mock analysis. Configure OPENAI_API_KEY environment variable for real AI analysis.*`
}
