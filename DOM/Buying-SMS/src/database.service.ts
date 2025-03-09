import { SMS } from './sms.interface';

export interface IMovie {
    id?: number;
    title: string;
    director: string;
    year: number;
    rating: number;
}

export class DatabaseService {
    private db: IDBDatabase | null = null;
    private readonly DB_NAME = 'SMSDB';
    private readonly STORE_NAME = 'sms';
    private readonly SMS_COST = 0.01; // Cost per SMS in dollars

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
                    store.createIndex('phoneNumber', 'phoneNumber', { unique: false });
                }
            };
        });
    }

    calculateCost(quantity: number): number {
        return quantity * this.SMS_COST;
    }

    async addSMS(phoneNumber: string, message: string, quantity: number): Promise<void> {
        const totalCost = this.calculateCost(quantity);
        const sms: SMS = { phoneNumber, message, quantity, totalCost };

        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.add(sms);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async getAllSMS(): Promise<SMS[]> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteSMS(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}