import express from 'express';
import Return from '../models/return_model';

const router = express.Router();

// リターンの取得
router.get('/:projectID', async (req, res) => {
    const { projectID } = req.params;
    try {
        const returns = await Return.find({ projectID });
        res.status(200).json({ returns });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get returns' });
    }
});

export default router;
