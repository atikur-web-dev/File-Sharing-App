# FileShare

A file sharing app I built to learn modern React development. Upload files, get shareable links, and track downloads.

## What It Does

- Upload files by dragging and dropping
- Get public links to share with anyone
- See who downloaded your files (analytics dashboard)
- Manage your profile and password
- Works on mobile and desktop

## Tech I Used

React, TypeScript, Tailwind CSS, Framer Motion, Recharts, React Hook Form, Zod, Axios.

## Quick Start

```bash
npm install
npm run dev

Project Structure
src/
├── api/                   
│   ├── analyticsApi.ts     
│   ├── authApi.ts         
│   ├── axios.ts           
│   └── fileApi.ts          
│
├── assets/              
│   └── logo.svg           
│
├── components/          
│   ├── analytics/          
│   │   └── DownloadChart.tsx
│   ├── auth/              
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── common/            
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── Modal.tsx
│   │   └── PageTransition.tsx
│   ├── dashboard/       
│   │   ├── SearchBar.tsx
│   │   └── SortDropdown.tsx
│   ├── files/              
│   │   ├── FileCard.tsx
│   │   ├── FileList.tsx
│   │   ├── FileUpload.tsx
│   │   └── Pagination.tsx
│   ├── layout/             
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   └── profile/          
│       ├── ChangePasswordForm.tsx
│       └── ProfileForm.tsx
│
├── contexts/             
│   ├── AuthContext.tsx
│   ├── AuthProvider.tsx
│   ├── ThemeContext.tsx
│   └── ThemeProvider.tsx
│
├── hooks/               
│   ├── useAuth.ts
│   ├── useCopyToClipboard.ts
│   ├── useMediaQuery.ts
│   └── useTheme.ts
│
├── lib/                
│   ├── constants.ts
│   └── utils.ts
│
├── pages/                  
│   ├── AnalyticsPage.tsx
│   ├── DashboardPage.tsx
│   ├── FileSharePage.tsx
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── NotFoundPage.tsx
│   ├── ProfilePage.tsx
│   └── RegisterPage.tsx
│
├── types/                  
│   └── index.ts
│
├── App.tsx                
├── index.css              
└── main.tsx                
