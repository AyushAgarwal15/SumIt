# SumIt - AI Article Summarizer

SumIt is a modern web application that uses AI to transform lengthy articles into clear, concise summaries. Built with React and powered by advanced AI, it helps users quickly grasp the key points of any article.

## Features

- **Smart Summarization**: Instantly generate concise summaries of any article using advanced AI
- **URL Support**: Works with any valid article URL
- **History Management**:
  - Save and access your recent summaries
  - Delete unwanted entries
  - One-click re-summarization of past articles
- **Copy & Share**:
  - Easy copy functionality for both URLs and summaries
  - Share summaries across various platforms
- **Mobile Responsive**:
  - Fully optimized for all devices
  - Touch-friendly interface
  - Adaptive layout and typography

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **State Management**: Redux Toolkit
- **API Integration**: RTK Query
- **Animation**: CSS Animations
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/AyushAgarwal15/AI_Summarizer.git
   ```

2. Install dependencies:

   ```bash
   cd AI_Summarizer
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:

   ```env
   VITE_RAPID_API_ARTICLE_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Summarize an Article**:

   - Paste any article URL in the input field
   - Click the enter button or press return
   - View your generated summary

2. **Manage History**:

   - Access your recent summaries below the input field
   - Click on any past summary to view it again
   - Use the copy button to copy URLs
   - Delete unwanted entries with the trash icon

3. **Share Summaries**:
   - Copy the generated summary
   - Share it on your preferred platform

## UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Adapts seamlessly to all screen sizes
- **Interactive Elements**:
  - Smooth hover effects
  - Loading animations
  - Feedback animations
- **Accessibility**:
  - Proper ARIA labels
  - Keyboard navigation
  - Screen reader support

## Performance Optimizations

- Efficient state management with Redux Toolkit
- RTK Query for API caching
- Optimized asset loading
- Responsive images and icons
- Minimized bundle size

## Contact

Ayush Agarwal - [Portfolio](https://ayushagarwal.vercel.app/)
