import { Request, Response } from "express";
import { RESP } from "../responses/TemplateResponse";
import HttpStatus from "../const/conres";
import folderService from "../services/folderService";
import { ApiError } from "../responses/ApiError";

export default {
  createFolder: async (req: Request, res: Response): Promise<void> => {
    try {
      const folderData = req.body;
      if (!folderData.name) {
        res
          .status(HttpStatus.BAD_REQUEST.code)
          .send(RESP.BAD_REQUEST("CreateFolder - Name is required", {}));
        return;
      }
      const newFolder = await folderService.createFolder(folderData);
      res.status(HttpStatus.CREATED.code).send(RESP.OK(newFolder));
    } catch (error) {
      if (error instanceof ApiError) {
        // Gunakan status dari error dan RESP yang sesuai
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "CreateFolder - Internal Server Error",
              error
            )
          );
      }
    }
  },

  getAllFolders: async (req: Request, res: Response): Promise<void> => {
    try {
      const folders = await folderService.getAllFolders();
      res.send(RESP.OK(folders));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "GetAllFolders - Internal Server Error",
              error
            )
          );
      }
    }
  },

  getAllFoldersTree: async (req: Request, res: Response) => {
    try {
      const result = await folderService.getAllFoldersTree();
      res.send(RESP.OK(result));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "GetAllFoldersTree - Internal Server Error",
              error
            )
          );
      }
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);

      const folder = await folderService.getById(id);
      if (!folder) {
        res
          .status(HttpStatus.NOT_FOUND.code)
          .send(RESP.NOT_FOUND("GetFolderById - ID not found", {}));
        return;
      }
      res.send(RESP.OK(folder));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "GetById - Internal Server Error",
              error
            )
          );
      }
    }
  },

  getChildren: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const children = await folderService.getChildren(id);
      res.send(RESP.OK(children));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "GetChildren - Internal Server Error",
              error
            )
          );
      }
    }
  },

  updateFolder: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const folderData = req.body;

      const updatedFolder = await folderService.updateFolder(id, folderData);
      res.send(RESP.OK(updatedFolder));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "UpdateFolder - Internal Server Error",
              error
            )
          );
      }
    }
  },

  deleteFolder: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const deletedFolder = await folderService.deleteFolder(id);
      if (!deletedFolder) {
        res
          .status(HttpStatus.NOT_FOUND.code)
          .send(RESP.NOT_FOUND("DeleteFolder - ID not found", {}));
        return;
      }
      res.send(RESP.OK(deletedFolder));
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.statusCode === 400) {
          res.status(400).send(RESP.BAD_REQUEST(error.message, {}));
        } else if (error.statusCode === 404) {
          res.status(404).send(RESP.NOT_FOUND(error.message, {}));
        } else {
          res
            .status(error.statusCode)
            .send(RESP.INTERNAL_SERVER_ERROR(error.message, {}));
        }
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            RESP.INTERNAL_SERVER_ERROR(
              "DeleteFolder - Internal Server Error",
              error
            )
          );
      }
    }
  },
};
