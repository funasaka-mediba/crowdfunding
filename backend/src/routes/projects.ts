// routes/project.ts is a file that contains the routes for the projects.
import express, {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';

const prisma = new PrismaClient();
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });

// Get all projects
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await prisma.project.findMany({
            take: 20
        });
        // 全てのprojectsのdeadlineと現在の日付の差分を計算
        projects.forEach((project) => {
            const now = new Date();
            const diff = project.deadline.getTime() - now.getTime();
            const deadlineInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
            // project.deadlineInDays = deadlineInDays;
        });
        res.json({projects});
    } catch (error) {
        next(error);
    }
});

// Get project by id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = parseInt(req.params.id);
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: { returns: true }
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // projectのdeadlineと現在の日付の差分を計算
        const now = new Date();
        const diff = project.deadline.getTime() - now.getTime();
        const deadlineInDays = Math.floor(diff / (1000 * 60 * 60 * 24))
        // project.deadlineInDays = deadlineInDays;
        res.json({project});
    } catch (error) {
        next(error);
    }
});

// Search projects
router.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
    const { keyword } = req.query;
    try {
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { title: { contains: keyword as string } },
                    { description: { contains: keyword as string } }
                ]
            },
            include: { returns: true }
        });
        res.json({projects});
    } catch (error) {
        next(error);
    }
});

// Create new project
router.post('/', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, goalAmount, deadline } = req.body;
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                goalAmount: parseFloat(goalAmount),
                deadline: new Date(deadline),
                // TODO: ドメインは環境変数で設定する
                imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : undefined
            }
        });
        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

export default router;
