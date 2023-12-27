## Folder Structure

```
├── prisma
│   ├── @types             # Global types used for seeding
│   ├── factories          # Factory files for generating fake data
│   ├── migrations         # Prisma-generated migration files
│   ├── seeds              # Seed files for populating the database
│   └── schema.prisma      # Database schema definition
├── public                 # CSS files for HTML responses
├── src
│   ├── api
│   │   ├── @types         # Global types used throughout the API
│   │   ├── controllers    # Controller modules
│   │   ├── databases      # Database configuration
│   │   ├── helpers        # Helper functions
│   │   ├── middleware     # Middleware functions
│   │   ├── routes         # Route files
│   │   ├── services       # Service modules
│   │   ├── socket
│   │   │   ├── @types
│   │   │   ├── controllers     # Socket controllers
│   │   │   ├── events          # Socket events
│   │   │   └── socket.ts       # Socket entry point
│   │   └── validations         # Validation files
│   ├── config             # Root configuration (CORS, file upload, etc.)
│   ├── servers            # Server configuration (Express, mailer, socket, etc.)
│   ├── views              # HTML response templates
└── └── server.ts          # Entry point of the server
```
