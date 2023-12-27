## Folder Structure

```
├── public                 # Static files (favicon, robots.txt, etc.)
├── src
│   ├── @types             # Global types
│   ├── app                # Redux store and rtk query configuration
│   ├── assets             # Static assets (images, fonts, etc.)
│   ├── components         # Reusable components
│   ├── config             # Enum variables, constants, and configuration
│   ├── features           # Feature modules (e.g., Redux slices)
│   │   ├── auth           # Auth feature module
│   │   │   ├── @types               # Types for auth feature module
│   │   │   ├── components           # Components for auth feature module
│   │   │   ├── store
│   │   │   │   ├── authService.ts   # Auth service to call API
│   │   │   │   └── authSlice.ts     # Auth state and reducer
│   │   │   ├── utils                # Utility functions for auth feature module
│   │   │   └── ...tsx               # Pages for auth feature module
│   │   └── ...
│   ├── hooks              # Global custom hooks
│   └── utils              # Utility functions
├── App.tsx                # Application route setup
└── main.tsx               # Entry point
```
