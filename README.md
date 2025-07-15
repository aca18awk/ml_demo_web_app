# Flask + React Demo Web App

A minimal full-stack web application with Flask backend and React frontend.

## Features

- **Backend (Flask)**:

tutorial used: https://youtu.be/ctQMqqEo4G8?si=9RymLsDTRMrStxL5

To create virtual env I used:

```bash
python -m venv backend_env
source backend_env/bin/activate
```

selecting correct venv: https://github.com/astral-sh/uv/issues/9637

- **Frontend (React + Vite)**:
  - Runs on port 5173
  - To install I did:
  ```bash
  npx create-vite
  cd frontend
  npm install
  npm run dev
  ```
  I had to update the node version to the latest (nvm install node) - make sure it's the latest version

`npm install axios`

## Project Structure

```
ML_demo_web_app/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   └── App.css        # Styles
│   ├── package.json       # Node.js dependencies
│   └── ...                # Other Vite files
└── README.md
```

## Setup Instructions

### Backend (Flask)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

The backend will be available at `http://localhost:5000`

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies (already done):

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/<id>` - Get user by ID

## Usage

1. Start both the Flask backend and React frontend
2. Open your browser to `http://localhost:5173`
3. View the list of users
4. Add new users using the form
5. The data persists only while the Flask server is running

## Next Steps

- Add a database (SQLite, PostgreSQL, etc.)
- Add user authentication
- Add more CRUD operations (Update, Delete)
- Add form validation
- Add error handling
- Deploy to production
