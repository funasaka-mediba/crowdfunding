// routes/project.ts is a file that contains the routes for the projects.
import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import Project, { IProject } from '../models/project_model';
import Return, { IReturn } from '../models/return_model';

const router = express.Router();

// Get all projects
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects: IProject[] = await Project.find().limit(10);
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
// router.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { title, description, goalAmount, deadline } = req.body;
//         const newProject: IProject = new Project({ title, description, goalAmount, deadline });
//         const savedProject: IProject = await newProject.save();
//         res.status(201).json(savedProject);
//     } catch (error) {
//         next(error);
//     }
// });

export default router;
