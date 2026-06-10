# Todo-list-2.0
A collaborative task management system featuring real-time synchronization and team-based productivity workflows.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

Todo-list-2.0 is a full-stack MERN application designed to handle complex task management for both individuals and teams. Unlike traditional todo apps, it integrates real-time communication via WebSockets and cloud-based asset management to provide a seamless collaborative experience.

---

## Visual Diagrams

### System Architecture
```mermaid
graph TD
    Client[React Frontend] -- REST API --> Server[Express Backend]
    Client -- WebSockets --> Server
    Server -- ORM --> DB[(MongoDB)]
    Server -- API --> Cloudinary[Cloudinary CDN]
    Server -- Job --> Cron[Cron Scheduler]
    subgraph Authentication
        Server -- JWT --> AuthMiddleware[Auth Middleware]
    end
```

### Real-time Task Synchronization Flow
```mermaid
sequenceDiagram
    participant U1 as User A (Client)
    participant S as Server (Socket.io)
    participant DB as MongoDB
    participant U2 as User B (Team Member)

    U1->>S: Create Task Request
    S->>DB: Save Task Document
    DB-->>S: Task Saved Successfully
    S->>U1: Emit 'taskCreated' (Self)
    S->>U2: Broadcast 'taskCreated' (Room)
    Note over U1, U2: UI Updates instantly for all members
```

### Entity Relationship Diagram
```mermaid
erDiagram
    USER ||--o{ TASK : creates
    USER ||--o{ TEAM : belongs_to
    TEAM ||--o{ TASK : contains
    USER {
        string id PK
        string username
        string email
        string profilePic
    }
    TASK {
        string id PK
        string title
        string description
        string status
        string creatorId FK
        string teamId FK
    }
    TEAM {
        string id PK
        string name
        string ownerId FK
    }
```

---

## Problem Statement
Standard task managers often act as isolated silos where team communication happens in a separate app from the actual task list. This "context switching" leads to outdated task statuses, missed deadlines, and a lack of transparency within collaborative projects. Users need a centralized platform where the state of work is reflected instantly across all stakeholders.

---

## Solution Overview
Todo-list-2.0 solves this by implementing a unified dashboard where every action—creating, updating, or deleting a task—is broadcasted in real-time to relevant team members. By combining state management (Zustand) with bi-directional communication (Socket.io), the application ensures that the "source of truth" is always visible without manual page refreshes.

---

## Key Features
*   Real-time Collaboration: Instant task updates across all connected clients using Socket.io.
*   Team Management: Group users into teams to share specific task lists and progress.
*   Media Integration: Profile picture uploads and asset management powered by Cloudinary.
*   Secure Authentication: JWT-based sessions with HTTP-only cookies for enhanced security.
*   Automated Maintenance: Server-side Cron jobs for database cleanup and system health.
*   Responsive UI: Built with React and optimized for both desktop and mobile viewing.
*   Dynamic Theming: User-configurable themes persisted across sessions via Zustand.

---

## Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| Frontend | React.js | UI Components and View Layer |
| Backend | Node.js / Express | Server Logic and API Routing |
| Database | MongoDB | Non-relational Document Storage |
| Real-time | Socket.io | Bi-directional Event-based Communication |
| State Management | Zustand | Lightweight Global State Handling |
| File Storage | Cloudinary | Image Hosting and Optimization |
| Authentication | JWT | Secure Token-based Access Control |
| Scheduling | Node-Cron | Background Tasks and System Maintenance |

---

## Quick Start/Installation

### Prerequisites
*   Node.js (v16.x or higher)
*   npm or yarn
*   MongoDB Atlas account or local instance

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the environment variables section below.
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

| Variable | Description | Example | Required |
| :--- | :--- | :--- | :--- |
| MONGODB_URI | Connection string for MongoDB | mongodb+srv://... | Yes |
| JWT_SECRET | Private key for token signing | your_super_secret_key | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary identifier | dx7xxxxxx | Yes |
| CLOUDINARY_API_KEY | Cloudinary access key | 123456789 | Yes |
| CLOUDINARY_API_SECRET | Cloudinary secret | abcdefg... | Yes |
| PORT | Backend server port | 5001 | No |
| NODE_ENV | Environment mode | development | No |

```env
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/todoapp
JWT_SECRET=mycomplexsecret123
CLOUDINARY_CLOUD_NAME=dxy123
CLOUDINARY_API_KEY=987654321
CLOUDINARY_API_SECRET=sec_98765
PORT=5001
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | Create a new user account | No |
| POST | `/api/auth/login` | Authenticate user and return cookie | No |
| POST | `/api/auth/logout` | Clear session cookie | Yes |

### Tasks
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/api/tasks` | Fetch all tasks for user/team | Yes |
| POST | `/api/tasks` | Create a new task | Yes |
| PUT | `/api/tasks/:id` | Update task status or content | Yes |
| DELETE | `/api/tasks/:id` | Remove a task | Yes |

### Curl Example (Create Task)
```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Implement WebSockets", "description": "Integrate Socket.io for real-time sync"}'
```

---

## Project Structure
```text
.
├── backend
│   ├── controllers      # Request handlers
│   ├── lib              # Shared utilities (DB, Cloudinary, Sockets)
│   ├── middleware       # Auth and validation logic
│   ├── models           # Mongoose schemas
│   ├── Routes           # API endpoint definitions
│   └── index.js         # Entry point
├── frontend
│   ├── src
│   │   ├── Components   # Reusable UI elements
│   │   ├── lib          # API configuration (Axios/Sockets)
│   │   ├── pages        # Routed views
│   │   ├── store        # Zustand state stores
│   │   └── App.jsx      # Main router/logic
└── package.json
```

---

## Deployment & Architecture Decisions
*   **Hosting**: The application is configured for deployment on Vercel (both frontend and backend) via `vercel.json` configurations. This choice provides seamless CI/CD and optimized delivery for static assets.
*   **Database**: MongoDB was chosen for its schema flexibility, allowing for rapid iteration as task attributes (tags, priorities, sub-tasks) evolve.
*   **State Management**: Zustand was selected over Redux to reduce boilerplate and improve performance in real-time scenarios where state updates are frequent.

---

## Technical Challenges & Solutions

### Challenge 1: Socket Connection Leaks
**Problem**: In React, navigating between components often caused multiple socket instances to be created, leading to memory leaks and duplicate event listeners.
**Solution**: Implemented a singleton pattern in `frontend/src/lib/socket.js` and managed the connection lifecycle within a global Zustand store. This ensures only one socket instance exists and is properly cleaned up on logout.

### Challenge 2: Real-time UI Consistency
**Problem**: When one user updates a task, other users in the same team need to see the change without a full data re-fetch to save bandwidth.
**Solution**: Developed an event-driven update mechanism. The server broadcasts only the changed task object. The client-side Zustand store then performs an immutable update on the local array using the task ID, resulting in a 0ms perceived latency for team members.

---

## Development Commands
*   `npm run dev` (Root): Start both frontend and backend concurrently.
*   `cd frontend && npm run build`: Generate production-ready frontend assets.
*   `cd backend && npm start`: Start the production Node.js server.

---

## Testing Approach
*   **Unit Testing**: Planned implementation for controller logic using Jest.
*   **Integration Testing**: Postman collections are used to verify REST API consistency across different environments.
*   **Manual Testing**: Verified real-time synchronization by running multiple browser instances with different user accounts simultaneously.

---

## Contributing Guidelines
We welcome contributions to Todo-list-2.0. If you have ideas for new features or bug fixes, please fork the repository, create a feature branch, and submit a pull request. We aim to review all community contributions within 48 hours.

---

## License
Distributed under the MIT License. See `LICENSE` for more information.

---

## Author Section
Built by [Tanmay Aggarwal](https://github.com/TanmayAggarwal87)  
📧 tanmayagg.2005@gmail.com

--made by [docify](https://docify-two.vercel.app/)--
