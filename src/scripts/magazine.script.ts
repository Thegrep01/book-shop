import * as mongoose from 'mongoose';
import { MagazineSchema } from '../magazine/schemas/magazine.schema';
import { getEnabledCategories } from 'trace_events';


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
        db.model('magazines', MagazineSchema);
        const MagazineModel: mongoose.Model<mongoose.Document> = mongoose.model('magazines');
        await MagazineModel.remove({});
        for (let i = 0; i < 100; i++) {
            const magazine = genMagazine();
            await MagazineModel.create(magazine);
        }
    } catch (error) {
        console.error(error);
    }
    mongoose.connection.close();
}

function genMagazine() {
    const magazine = {
        name: genName(),
        price: Math.floor(Math.random() * 100) + 1,
        date: genDate(),
        category: genCategory(),
        url: 'store/books/cover.jpg',
    }
    return magazine;
}

function genName() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

}

function genCategory() {
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

function genDate() {
    const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let text: string = `${(Math.floor(Math.random() * (31 - 1) + 1)).toString()} ${monthes[Math.floor(Math.random() * monthes.length)]} ${(Math.floor(Math.random() * (2019 - 1990) + 1990)).toString()}`;
    return text;
}