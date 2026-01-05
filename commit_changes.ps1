# Root files
git add .gitignore; git commit -m "Add .gitignore"
git add docker-compose.yml; git commit -m "Add Docker Compose config"
git add start_docker.bat; git commit -m "Add Docker start script"
git add deployment_plan.md; git commit -m "Add Deployment Plan"

# Backend
git add backend/Dockerfile; git commit -m "Add Backend Dockerfile"
git add backend/requirements.txt; git commit -m "Update backend dependencies"
git add backend/main.py; git commit -m "Update backend API"
git add backend/auth.py; git commit -m "Add auth logic"
git add backend/models.py; git commit -m "Add DB models"
git add backend/database.py; git commit -m "Add DB connection"
git add backend/test_auth.py; git commit -m "Add auth tests"
git add backend/test_execute.py; git commit -m "Add execution tests"
git add backend/ingest_questions.py; git commit -m "Add ingestion script"
git add backend/questions.json; git commit -m "Add questions data"
git add backend/debug_hash.py; git commit -m "Add hash debugger"

# Frontend Configuration
git add frontend/Dockerfile; git commit -m "Add Frontend Dockerfile"
git add frontend/package.json; git commit -m "Add frontend dependencies"
git add frontend/next.config.ts; git commit -m "Add Next.js config"
git add frontend/tsconfig.json; git commit -m "Add TypeScript config"
git add frontend/tailwind.config.ts; git commit -m "Add Tailwind config"
git add frontend/postcss.config.mjs; git commit -m "Add PostCSS config"
git add frontend/eslint.config.mjs; git commit -m "Add ESLint config"
git add frontend/components.json; git commit -m "Add Shadcn config"

# Frontend Source
git add frontend/src/app/globals.css; git commit -m "Add Cosmic Glass theme"
git add frontend/src/lib/utils.ts; git commit -m "Add utility functions"
git add frontend/src/context/auth-context.tsx; git commit -m "Add AuthContext"
git add frontend/src/app/(auth)/login/page.tsx; git commit -m "Add Login page"
git add frontend/src/app/(auth)/signup/page.tsx; git commit -m "Add Signup page"
git add frontend/src/app/layout.tsx; git commit -m "Update root layout"
git add frontend/src/app/page.tsx; git commit -m "Update Dashboard"
git add frontend/src/app/practice/page.tsx; git commit -m "Add Practice page"
git add frontend/src/app/arena/page.tsx; git commit -m "Add Arena page"
git add frontend/src/app/interview/page.tsx; git commit -m "Add Interview page"
git add frontend/src/app/insights/page.tsx; git commit -m "Add Insights page"
git add frontend/src/app/system-design/page.tsx; git commit -m "Add System Design page"
git add frontend/src/app/resume/page.tsx; git commit -m "Add Resume AI page"
git add frontend/src/app/labs/page.tsx; git commit -m "Add Tech Labs page"

# Frontend Components
git add frontend/src/components/layout/sidebar.tsx; git commit -m "Add Sidebar component"
git add frontend/src/components/layout/header.tsx; git commit -m "Add Header component"
git add frontend/src/components/arena/; git commit -m "Add Code Arena components"
git add frontend/src/components/ui/; git commit -m "Add UI components"
git add frontend/src/components/system-design/; git commit -m "Add System Design components"

# Catch all remaining
git add .; git commit -m "Add remaining project files"
