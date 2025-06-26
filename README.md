# Fix My Code - AI-Powered Code Analysis Playground

A comprehensive multi-language code debugging and optimization platform powered by AI. Analyze, fix, and improve your code instantly with intelligent suggestions and explanations.

## 🚀 Features

- **Multi-Language Support**: JavaScript, TypeScript, Python, Java, C++, Go, Rust, and more
- **AI-Powered Analysis**: Uses OpenAI GPT-4 for intelligent code review and debugging
- **Real-time Feedback**: Instant analysis with detailed explanations
- **Before/After Comparison**: Visual diff showing original vs. improved code
- **Smart Language Detection**: Automatically detects programming language
- **Demo Mode**: Works without API key for testing and demonstration
- **Dark/Light Theme**: Responsive design with theme switching
- **Export Options**: Copy, download, and share your fixed code

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI Integration**: AI SDK with OpenAI GPT-4
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key (optional for demo mode)

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd fix-my-code
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables (optional)
\`\`\`bash
# Create .env.local file
OPENAI_API_KEY=sk-your-openai-api-key-here
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### OpenAI API Key Setup

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Add it to your environment variables:
   - **Local**: Add to `.env.local` file
   - **Vercel**: Add in Project Settings → Environment Variables
   - **Netlify**: Add in Site Settings → Environment Variables

### Demo Mode

The application works without an API key by providing mock analysis results. This is perfect for:
- Testing the interface
- Demonstrating functionality
- Development without API costs

## 📖 Usage

1. **Paste Your Code**: Enter your code in the input area
2. **Select Language**: Choose from 15+ supported programming languages
3. **Choose Analysis Type**: Pick from bug fixes, optimization, style improvements, etc.
4. **Get Results**: View detailed analysis with explanations and improvements
5. **Compare**: See before/after comparison of your code
6. **Export**: Copy, download, or share the improved code

## 🎨 Features in Detail

### Code Analysis Types
- **Fix Bugs**: Identify and resolve syntax and logic errors
- **Optimize Performance**: Improve code efficiency and speed
- **Improve Style**: Enhance code readability and formatting
- **Security Review**: Identify potential security vulnerabilities
- **Complete Analysis**: Comprehensive review covering all aspects

### Supported Languages
JavaScript, TypeScript, Python, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, C#, HTML, CSS, SQL

### Smart Features
- **Auto Language Detection**: Automatically identifies programming language
- **Severity Indicators**: Color-coded priority levels for issues
- **Structured Results**: Organized display of issues, improvements, and explanations
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

1. Connect your GitHub repository
2. Add `OPENAI_API_KEY` environment variable
3. Deploy

### Deploy to Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `out` or `.next`
4. Add `OPENAI_API_KEY` environment variable

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- AI powered by [OpenAI](https://openai.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Fix My Code** - Empowering developers with AI-powered code analysis and debugging 🚀
