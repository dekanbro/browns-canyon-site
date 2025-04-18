# Browns River Webpage

A modern web application built with Next.js 15, TypeScript, and Shadcn UI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Database**: Airtable
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js (LTS version)
- pnpm
- Airtable API credentials

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd webpage
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── public/          # Static assets
└── styles/          # Global styles and Tailwind configuration
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Future Development

### Planned Features

1. **Dropshipping Integration**
   - Implement product management system
   - Add order processing functionality
   - Integrate with shipping providers

2. **Enhanced Authentication**
   - Implement secure user authentication
   - Add role-based access control
   - Improve condition update security

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 