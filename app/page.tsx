"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { LanguageDetector } from "@/components/language-detector"
import { ThemeToggle } from "@/components/theme-toggle"
import { Code2, Wand2, Copy, Download, AlertCircle, CheckCircle, Lightbulb, Zap, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "csharp", label: "C#" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
]

const FIX_TYPES = [
  { value: "bugs", label: "Fix Bugs" },
  { value: "optimize", label: "Optimize Performance" },
  { value: "style", label: "Improve Style" },
  { value: "security", label: "Security Review" },
  { value: "complete", label: "Complete Analysis" },
]

export default function FixMyCodePlayground() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [fixType, setFixType] = useState("complete")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("input")

  // Replace the handleAnalyze function with this:
  const handleAnalyze = async () => {
    if (!code.trim()) return

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch("/api/fix-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, fixType }),
      })

      const data = await response.json()

      if (data.success) {
        // Parse the structured response
        const content = data.content
        const parsedResult = parseAnalysisResult(content)

        // Add mock indicator
        parsedResult.isMock = data.isMock

        setResult(parsedResult)
        setActiveTab("results")
      } else {
        throw new Error(data.error || "Analysis failed")
      }
    } catch (error) {
      console.error("Analysis error:", error)
      setResult({
        fixedCode: "Error occurred during analysis",
        explanation: "Sorry, there was an error analyzing your code. Please try again.",
        issues: ["Analysis failed"],
        improvements: [],
        severity: "high",
        isMock: false,
      })
      setActiveTab("results")
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Add this helper function to parse the AI response:
  const parseAnalysisResult = (content: string) => {
    const sections = {
      fixedCode: "",
      explanation: "",
      issues: [],
      improvements: [],
      severity: "medium",
    }

    try {
      // Extract sections using regex patterns
      const fixedCodeMatch = content.match(/\*\*FIXED CODE:\*\*\s*([\s\S]*?)(?=\*\*|$)/i)
      const explanationMatch = content.match(/\*\*EXPLANATION:\*\*\s*([\s\S]*?)(?=\*\*|$)/i)
      const issuesMatch = content.match(/\*\*ISSUES FOUND:\*\*\s*([\s\S]*?)(?=\*\*|$)/i)
      const improvementsMatch = content.match(/\*\*IMPROVEMENTS:\*\*\s*([\s\S]*?)(?=\*\*|$)/i)
      const severityMatch = content.match(/\*\*SEVERITY:\*\*\s*(low|medium|high)/i)

      if (fixedCodeMatch) {
        sections.fixedCode = fixedCodeMatch[1].trim().replace(/^```[\w]*\n?|```$/g, "")
      }

      if (explanationMatch) {
        sections.explanation = explanationMatch[1].trim()
      }

      if (issuesMatch) {
        sections.issues = issuesMatch[1]
          .split(/[-•*]\s+/)
          .filter((item) => item.trim())
          .map((item) => item.trim())
      }

      if (improvementsMatch) {
        sections.improvements = improvementsMatch[1]
          .split(/[-•*]\s+/)
          .filter((item) => item.trim())
          .map((item) => item.trim())
      }

      if (severityMatch) {
        sections.severity = severityMatch[1].toLowerCase()
      }

      // Fallback: if parsing fails, use the raw content
      if (!sections.fixedCode && !sections.explanation) {
        sections.explanation = content
        sections.fixedCode = code // Keep original if no fix found
      }
    } catch (error) {
      console.error("Parsing error:", error)
      sections.explanation = content
      sections.fixedCode = code
    }

    return sections
  }

  const handleLanguageDetect = (detectedLanguage: string) => {
    setLanguage(detectedLanguage)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fix My Code</h1>
              <p className="text-gray-600 dark:text-gray-300">AI-powered code analysis and debugging playground</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="input" className="flex items-center space-x-2">
              <Code2 className="h-4 w-4" />
              <span>Input Code</span>
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!result}>
              <div className="flex items-center space-x-2">
                <Wand2 className="h-4 w-4" />
                <span>Analysis Results</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="compare" disabled={!result}>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Before/After</span>
              </div>
            </TabsTrigger>
          </TabsList>

          {/* Input Tab */}
          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code2 className="h-5 w-5" />
                  <span>Code Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Analysis Type</label>
                    <Select value={fixType} onValueChange={setFixType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fix type" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIX_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Your Code</label>
                    <LanguageDetector code={code} onDetect={handleLanguageDetect} />
                  </div>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>

                <Button onClick={handleAnalyze} disabled={!code.trim() || isAnalyzing} className="w-full" size="lg">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analyzing Code...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Analyze & Fix Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {result && (
              <>
                {/* Summary Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span>Analysis Summary</span>
                      </CardTitle>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity?.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{result.explanation}</p>
                  </CardContent>
                </Card>

                {result.isMock && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Demo Mode:</strong> This is a mock analysis since no OpenAI API key is configured. To get
                      real AI-powered code analysis, add your <code>OPENAI_API_KEY</code> environment variable.
                    </AlertDescription>
                  </Alert>
                )}

                {/* Issues and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.issues?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="h-5 w-5" />
                          <span>Issues Found</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.issues.map((issue: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {result.improvements?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-green-600">
                          <Lightbulb className="h-5 w-5" />
                          <span>Improvements Made</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {result.improvements.map((improvement: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-gray-700 dark:text-gray-300">{improvement}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Fixed Code */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Code2 className="h-5 w-5" />
                        <span>Fixed Code</span>
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(result.fixedCode)}>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadCode(result.fixedCode, `fixed-code.${language}`)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={result.fixedCode} language={language} />
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            {result && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Before (Original)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={code} language={language} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">After (Fixed)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock code={result.fixedCode} language={language} />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Fix My Code. Built with Next.js, AI SDK, and OpenAI.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Empowering developers with AI-powered code analysis and debugging
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
