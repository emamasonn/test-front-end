import {deleteTransaction} from 'api';
import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        const id = req.query.id as string;
        try {
            await deleteTransaction(id);
            res.status(204).end();
        } catch (error) {
            res.status(error.statusCode || 500).json({error: error.message});
        }
    } else {
        res.status(405).end();
    }
};
