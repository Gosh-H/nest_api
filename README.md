# NestJS Store Data API

A NestJS application that stores data either in a PostgreSQL database or in a file, based on the `StoreType` header.

## Quick Start

### 1. Start Docker Compose

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start PostgreSQL on port `5432`.

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration if needed (defaults are provided).

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Testing with Postman

A Postman collection is included in this repository: `NestJS_Store_Data_API.postman_collection.json`

You can now test the API endpoints directly from Postman!

## API Endpoint

### POST /store

Store data in database or file.

**Headers:**
- `StoreType`: `"db"` (database) or `"file"` (file storage)

**Request Body:**
```json
{
  "someString": "your data here"
}
```