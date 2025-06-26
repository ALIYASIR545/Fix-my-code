import { Code2 } from "lucide-react"

interface BrandHeaderProps {
  showSubtitle?: boolean
  className?: string
}

export function BrandHeader({ showSubtitle = true, className = "" }: BrandHeaderProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="p-2 bg-blue-600 rounded-lg">
        <Code2 className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Fix My Code</h1>
        {showSubtitle && (
          <p className="text-gray-600 dark:text-gray-300">AI-powered code analysis and debugging playground</p>
        )}
      </div>
    </div>
  )
}
