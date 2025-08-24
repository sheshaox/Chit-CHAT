#Backend Setup

cd server
npm install

create .env fiel inside server/:
PORT=5000
MONGODB_URI=mongodb://localhost:27017(ur mongodb database url)
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


Run Backend

npm run dev
