const mongoose = require("mongoose");
const Book = require("./models/book");
const Author = require("./models/author");

// Connect to MongoDB
mongoose.connect("mongodb+srv://teo:123@superkids.uykkxhl.mongodb.net/")
  .then(() => {
    console.log("Connected to database for seeding");
    seedData();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

async function seedData() {
  try {
    // Clear existing data
    await Book.deleteMany({});
    await Author.deleteMany({});
    console.log("Cleared existing data");

    // Create authors
    const author1 = new Author({
      name: "J.K. Rowling",
      age: 58
    });

    const author2 = new Author({
      name: "George Orwell", 
      age: 46
    });

    const author3 = new Author({
      name: "Harper Lee",
      age: 89
    });

    // Save authors
    const savedAuthor1 = await author1.save();
    const savedAuthor2 = await author2.save();
    const savedAuthor3 = await author3.save();

    console.log("Authors created:", savedAuthor1._id, savedAuthor2._id, savedAuthor3._id);

    // Create books with proper authorId references
    const books = [
      {
        name: "Harry Potter and the Philosopher's Stone",
        genre: "Fantasy",
        authorId: savedAuthor1._id.toString()
      },
      {
        name: "Harry Potter and the Chamber of Secrets", 
        genre: "Fantasy",
        authorId: savedAuthor1._id.toString()
      },
      {
        name: "Harry Potter and the Prisoner of Azkaban",
        genre: "Fantasy", 
        authorId: savedAuthor1._id.toString()
      },
      {
        name: "1984",
        genre: "Dystopian Fiction",
        authorId: savedAuthor2._id.toString()
      },
      {
        name: "Animal Farm",
        genre: "Political Satire",
        authorId: savedAuthor2._id.toString()
      },
      {
        name: "To Kill a Mockingbird",
        genre: "Southern Gothic",
        authorId: savedAuthor3._id.toString()
      }
    ];

    // Save books
    for (let bookData of books) {
      const book = new Book(bookData);
      await book.save();
      console.log(`Created book: ${book.name}`);
    }

    console.log("Sample data seeded successfully!");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}
