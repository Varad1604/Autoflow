# 🚀 AutoFlow - AI-Powered Workflow Automation

> **Transform your complex workflows into simple, automated processes using plain English!**

AutoFlow is an intelligent automation platform that helps you create powerful workflows by simply describing what you want to automate. No technical skills required - just tell our AI what you need, and we'll guide you through building the perfect automation.



## ✨ What Makes AutoFlow Special?

- 🤖 **AI-Powered**: Uses Google Gemini AI to understand your automation needs
- 📝 **Plain English**: Describe your workflow in simple language - no coding required
- 🎯 **Guided Process**: 4-step wizard walks you through automation creation
- 🔗 **App Integration**: Works with Gmail, Slack, Google Sheets, Calendar, HubSpot, and more
- 📊 **Template Library**: Pre-built automations for common business workflows
- 🎨 **Beautiful UI**: Modern, responsive design that works on all devices
- ⚡ **Export Ready**: Generate make.com-compatible automations

## 🎯 Perfect For

- **Business Professionals** who need automation but lack technical skills
- **Small to Medium Businesses** looking to streamline workflows
- **Teams** wanting to collaborate on automation projects
- **Anyone** who finds traditional automation tools too complex

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Google Gemini API Key** - [Get one here](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Varad1604/plain-english-flows.git
   cd plain-english-flows
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment**
   ```bash
   # Create a .env file in the root directory
   touch .env
   ```
   
   Add your Gemini API key to the `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` and start creating automations!

## 🎮 How to Use AutoFlow

### 1. **Describe Your Automation**
Tell us what you want to automate in plain English:
```
"When a new lead fills out our contact form, send them a welcome email and add them to our CRM"
```

### 2. **Select Your Apps**
Our AI will suggest relevant apps and tools. Choose the ones you want to use:
- Gmail for emails
- Slack for notifications
- Google Sheets for data
- And many more!

### 3. **Configure Your Workflow**
Specify which app triggers your automation and what actions should happen:
- **Trigger**: What starts the automation (e.g., new form submission)
- **Actions**: What happens next (e.g., send email, update spreadsheet)

### 4. **Deploy & Monitor**
Review your automation and deploy it or export to make.com for execution.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Project Structure

```
plain-english-flows/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── layout/          # Layout components (sidebar, header)
│   │   └── ui/              # Base UI components (buttons, cards, etc.)
│   ├── pages/               # Main application pages
│   │   ├── Index.tsx        # Dashboard/Home page
│   │   ├── CreateAutomation.tsx  # Automation creation wizard
│   │   ├── Templates.tsx    # Template library
│   │   └── Settings.tsx     # User settings
│   ├── lib/                 # Utility functions and services
│   │   ├── gemini.ts        # AI/Gemini API integration
│   │   └── utils.ts         # Helper functions
│   ├── hooks/               # Custom React hooks
│   └── App.tsx              # Main application component
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with:

```env
# Required: Your Google Gemini API Key
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: Custom configuration
VITE_APP_NAME=AutoFlow
VITE_APP_VERSION=1.0.0
```

### Settings Page

You can also configure your API key through the app:
1. Go to **Settings** in the sidebar
2. Enter your Gemini API key
3. Click **Save Settings**

## 🎨 Customization

### Adding New Apps

To add support for new applications:

1. **Update the available apps list** in `src/pages/CreateAutomation.tsx`:
   ```typescript
   const availableApps: App[] = [
     // ... existing apps
     { 
       id: "your-app", 
       name: "Your App", 
       icon: YourIcon, 
       category: "Your Category", 
       description: "What your app does" 
     }
   ];
   ```

2. **Add the app icon** (optional):
   ```typescript
   import { YourIcon } from "lucide-react";
   ```

### Styling

The app uses **Tailwind CSS** for styling. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `src/index.css`
- Component-specific styles using Tailwind classes

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 🐛 Troubleshooting

### Common Issues

**❌ "Gemini API key not set" error**
- Make sure you've added your API key to the `.env` file
- Check that the key is valid and has the correct permissions
- Restart the development server after adding the key

**❌ "Failed to fetch from Gemini API" error**
- Check your internet connection
- Verify your API key is correct
- Make sure you have sufficient API quota

**❌ App won't start**
- Make sure Node.js is installed (version 16+)
- Run `npm install` to install dependencies
- Check that port 5173 is available

**❌ Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Getting Help

- 📧 **Email**: support@autoflow.com
- 💬 **Discord**: [Join our community](https://discord.gg/autoflow)
- 🐛 **Issues**: [GitHub Issues](https://github.com/Varad1604/plain-english-flows/issues)
- 📖 **Documentation**: [Full Documentation](https://docs.autoflow.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for providing the AI capabilities
- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the styling framework
- **React** and **Vite** for the development experience
- **make.com** for automation platform inspiration

## 📊 Project Status

![GitHub stars](https://img.shields.io/github/stars/Varad1604/plain-english-flows?style=social)
![GitHub forks](https://img.shields.io/github/forks/Varad1604/plain-english-flows?style=social)
![GitHub issues](https://img.shields.io/github/issues/Varad1604/plain-english-flows)
![GitHub license](https://img.shields.io/github/license/Varad1604/plain-english-flows)

---

**Made with ❤️ by the AutoFlow Team**

*Transform your workflows, one automation at a time!*
