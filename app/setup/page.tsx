import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Code2, Key, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Key className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fix My Code - Setup Guide</h1>
            <p className="text-gray-600 dark:text-gray-300">Configure your OpenAI API key for full functionality</p>
          </div>
        </div>

        <div className="space-y-6">
          <Alert className="border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Good news!</strong> The app works in demo mode without an API key, but you'll get much better
              results with a real OpenAI API key.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Step 1: Get Your OpenAI API Key</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Visit{" "}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    OpenAI API Keys page
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
                <li>Sign in to your OpenAI account (create one if needed)</li>
                <li>Click "Create new secret key"</li>
                <li>Copy the generated API key (starts with "sk-")</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Add Environment Variable</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add your API key as an environment variable in your deployment:
              </p>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                <code>OPENAI_API_KEY=sk-your-api-key-here</code>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">For different platforms:</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>
                    <strong>Vercel:</strong> Add in Project Settings → Environment Variables
                  </li>
                  <li>
                    <strong>Netlify:</strong> Add in Site Settings → Environment Variables
                  </li>
                  <li>
                    <strong>Local development:</strong> Create a <code>.env.local</code> file
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Test the Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Once you've added the API key, restart your application and try analyzing some code. You should no
                longer see the "Demo Mode" notification.
              </p>

              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Back to Fix My Code
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
