# Survey Form Client Application

## Project Overview

This is the frontend part of a MERN stack survey form application. It provides a user interface for submitting survey information and an admin dashboard to view submissions.

## Features

- **User Survey Form**: Responsive form with fields for name, gender, nationality, email, phone number, address, and message
- **Form Validation**: Comprehensive validation using React Hook Form and Zod
- **Success Feedback**: Notification and success page after form submission
- **Admin Authentication**: Secure JWT-based login system with protected routes
- **Admin Dashboard**: View all survey submissions with detailed information
- **Anti-Spam Protection**: Implemented honeypot technique to prevent spam submissions
- **Responsive Design**: Works seamlessly across various device sizes

## Live Demo

- **Frontend Application**: [https://survey-form-client.vercel.app](https://survey-form-client.vercel.app)
- **Admin Login**: [https://survey-form-client.vercel.app/admin/login](https://survey-form-client.vercel.app/admin/login)

## Tech Stack

- React 19.0.0
- TypeScript
- Vite
- React Router Dom 7.3.0
- React Hook Form 7.54.2 with Zod validation
- Tailwind CSS
- Axios for API calls
- Sonner for notifications
- shadcn/ui components

## Project Structure

```
client-side/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── FormField.tsx    # Reusable form field component
│   │   ├── FormSelect.tsx   # Reusable select component
│   │   └── FormTextarea.tsx # Reusable textarea component
│   ├── lib/                 # Utility functions
│   ├── pages/               # Application pages
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLoginPage.tsx
│   │   ├── FormPage.tsx
│   │   └── SuccessPage.tsx
│   ├── routes/              # Application routing
│   │   └── AppRoutes.tsx    # Route configuration
│   ├── schemas/             # Zod validation schemas
│   │   ├── adminLoginSchema.ts
│   │   └── formSchema.ts
│   ├── services/            # API service functions
│   │   ├── adminAuthService.ts
│   │   ├── dashboardService.ts
│   │   └── formService.ts
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Helper utilities
│   │   └── axiosConfig.ts   # Axios instance configuration
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/ashishalexander/survey-form-client
   cd survey-form-client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Deployment

The frontend is deployed on Vercel:
1. Connect your GitHub repository to Vercel
2. Configure the environment variables (VITE_API_URL pointing to your deployed backend)
3. Deploy the application

## Admin Access

To access the admin dashboard:
1. Navigate to `/admin/login`
2. Use the following credentials:
   - Email: admin@example.com
   - Password: Admin123@

## Challenges and Solutions

- **Tailwind and shadcn/ui Compatibility**: Resolved version conflicts by downgrading Tailwind to match the version required by shadcn/ui components
- **JWT Authentication**: Implemented secure authentication with HTTP-only cookies for enhanced security
- **Form Validation**: Created a robust validation system using React Hook Form and Zod for better user experience

## Related Repositories

This project is part of a MERN stack application:
- Frontend (current repository): Survey form client application
- Backend: [survey-form-backend](https://github.com/ashishalexander/survey-form-backend) - API server for storing and retrieving survey data

## License

MIT

## Author

Ashish Alexander