import * as mongoose from 'mongoose';
import { BookSchema } from '../book/schemas/book.schema';


main();

async function main(): Promise<void> {
    const db: mongoose.Connection = mongoose.connection;
    const host: string = 'mongodb://localhost:27017/book-shop';
    const config = {
        autoIndex: true,
        useCreateIndex: true,
    };
    await mongoose.connect(host, { config });
    try {
        db.model('books', BookSchema);
        const BookModel: mongoose.Model<mongoose.Document> = mongoose.model('books');
        await BookModel.remove({});
        for (let i = 0; i < 100; i++) {
            const book = genBook();
            await BookModel.create(book);
        }
    } catch (error) {
        console.error(error);
    }
    mongoose.connection.close();
}

function genBook() {
    const book = {
        name: genName(),
        authour: genAuthour(),
        genres: genGenre(),
        price: Math.floor(Math.random() * 100) + 1,
        bookbider: (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? 'hardcover' : 'softcover',
        url: 'store/books/cover.jpg',
    }
    return book;
}

function genName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

}

function genGenre() {
    const possible = ['history', 'since fiction', 'drama', 'action', 'adventure', 'romance', 'mystery', 'horror', 'novel'];
    let genres = [];
    const c = (Math.floor(Math.random() * possible.length));
    for (let i = 0; i <= c; i++) {
        let k = (Math.floor(Math.random() * possible.length));
        if (!genres.toString().includes(possible[k])) {
            genres.push(possible[k]);
        }
    }
    return genres;
}

function genAuthour() {
    const possible = ['William Shakespeare', 'Ray Bradbury', 'Jack London', 'Mark Twen', 'Oskar Wilde'];
    let auth = [];
    const c = (Math.floor(Math.random() * possible.length));
    for (let i = 0; i <= c; i++) {
        let k = (Math.floor(Math.random() * possible.length));
        if (!auth.toString().includes(possible[k]))
            auth.push(possible[k]);
    }
    return auth;
}
