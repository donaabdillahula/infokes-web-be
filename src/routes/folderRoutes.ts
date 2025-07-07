import { Router } from 'express';
import folderController from '../controllers/folderController';

const folderRouter = Router();

folderRouter.post('/', folderController.createFolder);
folderRouter.get('/', folderController.getAllFolders);
folderRouter.get('/tree', folderController.getAllFoldersTree);
folderRouter.get('/:id/children', folderController.getChildren);
folderRouter.get('/:id', folderController.getById);
folderRouter.put('/:id', folderController.updateFolder);
folderRouter.delete('/:id', folderController.deleteFolder);

export default folderRouter;