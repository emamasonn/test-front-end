import {createTransaction, readTransactions} from 'api';
import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(415).end();
    } else if (req.method === 'GET') {
        const transactions = await readTransactions();
        res.status(200).json(transactions);
    } else if (req.method === 'POST') {
        try {
            const transaction = await createTransaction(req.body);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    } else {
        res.status(405).end();
    }
};
