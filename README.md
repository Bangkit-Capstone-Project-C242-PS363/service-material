# API Documentation

## Base URLs

- Development: `http://localhost:8080`
- Production: `https://signmaster-material-quiz-kji5w4ybbq-et.a.run.app`

## Authentication

All authenticated endpoints require a JWT token passed in the Authorization header:

```bash
Authorization: Bearer <token>
```

## Endpoints

### Materials

#### Get Chapters

```bash
GET /materials/getchapters
```

Returns a list of available chapters.

#### Get Materials for Chapter

```bash
GET /materials/getmaterials/{chapter_id}
```

Returns materials for a specific chapter.

#### Add Bookmark

```bash
POST /materials/bookmark
Content-Type: application/json

{
    "chapter_id": <integer>
}
```

Adds a bookmark for the specified chapter.

#### Remove Bookmark

```bash
DELETE /materials/bookmark
Content-Type: application/json

{
    "chapter_id": <integer>
}
```

Removes a bookmark for the specified chapter.

### Quiz

#### Get Quiz Chapters

```bash
GET /quiz/getchapters
```

Returns available quiz chapters.

#### Get Quiz for Chapter

```bash
GET /quiz/getquizz/{chapter_id}
```

Returns quiz questions for a specific chapter.

#### Complete Quiz

```bash
POST /quiz/complete
Content-Type: application/json

{
    "chapter_id": <integer>
}
```

Marks a quiz as completed for the specified chapter.

## Notes

- Chapter IDs appear to follow a pattern of multiples of 100 (e.g., 100, 200, 300)
- Error responses are returned in JSON format
- The API suppresses stderr output using `2>/dev/null`
- Response data can be prettified using the `jq` command-line tool

Would you like me to elaborate on any particular endpoint or feature?
