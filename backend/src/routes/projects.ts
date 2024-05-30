// routes/project.ts is a file that contains the routes for the projects.
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Project, { IProject } from '../models/project_model';
import Return, { IReturn } from '../models/return_model';

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
        const projects: IProject[] = await Project.find().limit(20);
        res.json({projects});
    } catch (error) {
        next(error);
    }
});

// Get project by id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = new mongoose.Types.ObjectId(req.params.id);
        console.log(`Requesting project with id: ${projectId}`);
        const project: IProject | null = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        console.log(`Found project: ${project}`);
        const returns: IReturn[] = await Return.find({ projectID: projectId });
        res.json({project, returns});
    } catch (error) {
        next(error);
    }
});

// Search projects
router.get('/search/:query', async (req: Request, res: Response, next: NextFunction) => {
    const { keyword, sort } = req.query;
    var filter: any = {};
    if (keyword) {
        filter.title = { $regex: keyword, $options: 'i'};
    }
    try {
        const query = req.params.query;
        const projects: IProject[] = await Project.find(filter).populate('returns');
        res.json({projects});
    } catch (error) {
        next(error);
    }
});

// Create new project
router.post('/', upload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, goalAmount, deadline } = req.body;
        const newProject: IProject = new Project({
            title,
            description,
            goalAmount,
            deadline,
            // TODO: ドメインは環境変数で設定する
            imageUrl: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : undefined
        });
        const savedProject: IProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        next(error);
    }
});

export default router;
