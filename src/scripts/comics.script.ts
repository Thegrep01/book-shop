import * as mongoose from 'mongoose';
import { ComixSchema } from '../comix/schemas/comix.schema';


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
        db.model('comix', ComixSchema);
        const ComixModel: mongoose.Model<mongoose.Document> = mongoose.model('comix');
        await ComixModel.remove({});
        for (let i = 0; i < 100; i++) {
            const comix = genComix();
            await ComixModel.create(comix);
        }
    } catch (error) {
        console.error(error);
    }
    mongoose.connection.close();
}

function genComix() {
    const comix = {
        name: genName(),
        authour: genAuthour(),
        painter: genPainter(),
        genres: genGenre(),
        price: Math.floor(Math.random() * 100) + 1,
        bookbider: (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? 'hardcover' : 'softcover',
        side: (Math.floor(Math.random() * 10) + 1) % 2 === 0 ? 'left-side' : 'right-side',
        url: 'store/books/cover.jpg',
    }
    return comix;
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
    const possible = ['history', 'since_fiction', 'drama', 'action', 'adventure', 'romance', 'mystery', 'horror', 'novel'];
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
    const possible = ['authour 1', 'authour 2', 'authour 3', 'authour 4', 'authour 5'];
    let auth = [];
    const c = (Math.floor(Math.random() * possible.length));
    for (let i = 0; i <= c; i++) {
        let k = (Math.floor(Math.random() * possible.length));
        if (!auth.toString().includes(possible[k]))
            auth.push(possible[k]);
    }
    return auth;
}

function genPainter() {
    const possible = ['painter 1', 'painter 2', 'painter 3', 'painter 4', 'painter 5'];
    let painter = [];
    const c = (Math.floor(Math.random() * possible.length));
    for (let i = 0; i <= c; i++) {
        let k = (Math.floor(Math.random() * possible.length));
        if (!painter.toString().includes(possible[k]))
        painter.push(possible[k]);
    }
    return painter;
}