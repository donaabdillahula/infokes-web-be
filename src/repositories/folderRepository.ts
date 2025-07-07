import { Folder } from "../models/Folder";

export default {
  create: async (folderData: { name: string; parent_id?: number }) => {
    return await Folder.create(folderData);
  },
  findAll: async () => {
    return await Folder.findAll();
  },

  findById: async (id: number) => {
    return await Folder.findByPk(id);
  },

  findChildren: async (parentId: number) => {
    return await Folder.findAll({ where: { parent_id: parentId } });
  },
  update: async (id: number, folderData: { name?: string; parent_id?: number }) => {
    const folder = await Folder.findByPk(id);
    if (folder) {
      return await folder.update(folderData);
    }
    return null;
  },
  delete: async (id: number) => {
    const folder = await Folder.findByPk(id);
    if (folder) {
      return await folder.destroy();
    }
    return null;
  }
};
