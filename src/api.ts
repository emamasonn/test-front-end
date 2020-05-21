import dayjs from 'dayjs';
import {promises as fs} from 'fs';
import getConfig from 'next/config';
import path from 'path';
import {Transaction, TransactionValues} from 'types';
import {v4 as uuidv4} from 'uuid';

const {serverRuntimeConfig} = getConfig();
const dataPath = path.join(serverRuntimeConfig.PROJECT_ROOT, './data/transactions.json');

class APIError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, APIError.prototype);
    }
}

export const readTransactions = async (): Promise<Transaction[]> => {
    const rawTransactions = await fs.readFile(dataPath);
    return JSON.parse(rawTransactions.toString());
};

const writeTransactions = async (transactions: Transaction[]): Promise<void> => {
    await fs.writeFile(dataPath, JSON.stringify(transactions, null, 4));
};

export const createTransaction = async (values: TransactionValues): Promise<Transaction> => {
    if (!values.description) throw new APIError(400, 'Missing transaction description.');

    if (!values.date) throw new APIError(400, 'Missing transaction date.');
    if (!dayjs(values.date).isValid()) throw new APIError(400, 'Transaction date is invalid (format should be ISO 8061).');
    values.date = dayjs(values.date).toISOString();

    if (!values.amount) throw new APIError(400, 'Missing transaction amount.');
    if (isNaN(values.amount)) throw new APIError(400, 'Invalid transaction amount.');
    values.amount = Number(values.amount);
    if (!values.amount) throw new APIError(400, 'Transaction amount can\'t be zero.');

    const newTransaction: Transaction = {...values, id: uuidv4()};

    const transactions = await readTransactions();
    const balance = transactions.reduce((total, {amount}) => total + amount, 0);
    if (balance + newTransaction.amount < 0) throw new APIError(400, 'Transaction rejected, insufficient funds.');

    await writeTransactions([...transactions, newTransaction]);

    return newTransaction;
};

export const deleteTransaction = async (transactionId: string): Promise<void> => {
    const transactions = await readTransactions();
    if (!transactions.find(({id}) => id === transactionId)) throw new APIError(404, 'Transaction not found.');
    await writeTransactions(transactions.filter(({id}) => id !== transactionId));
};
