import folderRepository from "../repositories/folderRepository";
import { ApiError } from "../responses/ApiError";

export default {
  createFolder: async (folderData: { name: string; parent_id?: number }) => {
    if (!folderData.name) {
      throw new ApiError(400, "Folder name is required");
    }
    // if parent_id is provided, check if the parent folder exists
    if (folderData.parent_id !== undefined && folderData.parent_id !== null) {
      const parentFolder = await folderRepository.findById(
        folderData.parent_id
      );
      if (!parentFolder) {
        throw new ApiError(
          404,
          `Parent folder with ID ${folderData.parent_id} not found`
        );
      }
    }
    return await folderRepository.create(folderData);
  },

  getAllFolders: async () => {
    const folders = await folderRepository.findAll();
    return folders;
  },

  getAllFoldersTree: async () => {
    const folders = await folderRepository.findAll();
    const map: { [key: number]: any } = {};
    const roots: any[] = [];

    folders.forEach((folder) => {
      const folderData = folder.get();
      map[folderData.id] = { ...folderData, children: [] };
    });

    folders.forEach((folder) => {
      const folderData = folder.get();
      if (folderData.parent_id) {
        map[folderData.parent_id].children.push(map[folderData.id]);
      } else {
        roots.push(map[folderData.id]);
      }
    });

    return roots;
  },

  getChildren: async (parentId: number) => {
    return await folderRepository.findChildren(parentId);
  },

  getById: async (id: number) => {
    return await folderRepository.findById(id);
  },

  updateFolder: async (
    id: number,
    folderData: { name?: string; parent_id?: number }
  ) => {
    const existingFolder = await folderRepository.findById(id);
    if (!existingFolder) {
      throw new ApiError(404, `Folder with ID ${id} not found`);
    }

    // in english If parent_id is provided, check if the parent folder exists and is not itself
    if (folderData.parent_id !== undefined && folderData.parent_id !== null) {
      if (folderData.parent_id === id) {
        throw new ApiError(400, "A folder cannot be its own parent");
      }
      const parentFolder = await folderRepository.findById(
        folderData.parent_id
      );
      if (!parentFolder) {
        throw new ApiError(
          404,
          `Parent folder with ID ${folderData.parent_id} not found`
        );
      }
    }

    // Update only the fields that are provided
    const existingFolderData = existingFolder.get();
    if (folderData.name === undefined) {
      folderData.name = existingFolderData.name;
    }
    if (folderData.parent_id === undefined) {
      folderData.parent_id = existingFolderData.parent_id;
    }

    return await folderRepository.update(id, folderData);
  },

  deleteFolder: async (id: number) => {
    const folder = await folderRepository.findById(id);
    if (!folder) {
      throw new ApiError(404, `Folder with ID ${id} not found`);
    }
    // delete all children first
    const children = await folderRepository.findChildren(id);
    for (const child of children) {
      await folderRepository.delete(child.get().id);
    }
    // then delete the folder itself
    return await folderRepository.delete(id);
  },
};
