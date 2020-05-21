export type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
};

export type TransactionValues = Omit<Transaction, 'id'>;
