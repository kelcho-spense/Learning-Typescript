export interface IMovie {
    id?: number;
    title: string;
    director: string;
    year: number;
    rating: number;
}

export class DatabaseService {
    private db: IDBDatabase | null = null;
    private readonly DB_NAME = 'MoviesDB';
    private readonly STORE_NAME = 'movies';

    constructor() {
        this.initDatabase();
    }

    public initDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'id', autoIncrement: true });
                    store.createIndex('title', 'title', { unique: false });
                }
            };
        });
    }

    async addMovie(title: string, director: string, year: number): Promise<void> {
        const movie: IMovie = { title, director, year, rating: 0 };
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.add(movie);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async updateMovie(id: number, title: string, director: string, year: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => {
                const data = request.result;
                if (data) {
                    data.title = title;
                    data.director = director;
                    data.year = year;
                    store.put(data);
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async rateMovie(id: number, rating: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => {
                const data = request.result;
                if (data) {
                    data.rating = rating;
                    store.put(data);
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });
    }

    async deleteMovie(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getAllMovies(): Promise<IMovie[]> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}