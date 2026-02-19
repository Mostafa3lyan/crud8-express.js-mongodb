import { db } from "../connection.db.js"

export const books = []

export const BookModel = db.createCollection("Books")