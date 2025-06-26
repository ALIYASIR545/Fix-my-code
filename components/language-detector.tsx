"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface LanguageDetectorProps {
  code: string
  onDetect: (language: string) => void
}

export function LanguageDetector({ code, onDetect }: LanguageDetectorProps) {
  const [isDetecting, setIsDetecting] = useState(false)

  const detectLanguage = () => {
    if (!code.trim()) return

    setIsDetecting(true)

    // Simple heuristic-based language detection
    setTimeout(() => {
      let detectedLanguage = "javascript" // default

      if (code.includes("def ") || (code.includes("import ") && code.includes("from "))) {
        detectedLanguage = "python"
      } else if (code.includes("public class") || code.includes("System.out.println")) {
        detectedLanguage = "java"
      } else if (code.includes("#include") || code.includes("std::")) {
        detectedLanguage = "cpp"
      } else if (code.includes("func ") && code.includes("package ")) {
        detectedLanguage = "go"
      } else if (code.includes("fn ") && code.includes("let mut")) {
        detectedLanguage = "rust"
      } else if (code.includes("<?php")) {
        detectedLanguage = "php"
      } else if (code.includes("interface ") && code.includes(": ")) {
        detectedLanguage = "typescript"
      } else if (code.includes("<html") || code.includes("<!DOCTYPE")) {
        detectedLanguage = "html"
      } else if (code.includes("SELECT") || code.includes("FROM")) {
        detectedLanguage = "sql"
      }

      onDetect(detectedLanguage)
      setIsDetecting(false)
    }, 500)
  }

  return (
    <Button variant="outline" size="sm" onClick={detectLanguage} disabled={!code.trim() || isDetecting}>
      {isDetecting ? (
        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1" />
      ) : (
        <Zap className="h-3 w-3 mr-1" />
      )}
      Auto-detect
    </Button>
  )
}
