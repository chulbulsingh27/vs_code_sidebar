import { v4 as uuidv4 } from 'uuid';
export const Traversal = () => {
  const addnewItem = (fulldata, targetid, foldername, isfolder) => {
    if (fulldata.length === 0) return null;
    if (fulldata.id === targetid) {
      fulldata.children.unshift({
        id: uuidv4(),
        name: foldername,
        isfolder,
        children: [],
      });
      return { ...fulldata };
    }
    let finalarr = [];
    finalarr = fulldata.children.map((e) => {
      return addnewItem(e, targetid, foldername, isfolder);
    });
    return { ...fulldata, children: finalarr };
  };

  const deleteItem = (fulldata, targetid) => {
    if (fulldata.id === targetid) {
      return null;
    }
    let finalarr = [];
    if (fulldata.children) {
      fulldata.children.map((e, i) => {
        const result = deleteItem(fulldata.children[i], targetid);
        if (result !== null) {
          finalarr.push(result);
          
        }
        return finalarr;
      });
    }
    return { ...fulldata, children: finalarr };
  };

  const updateItem = (fulldata, targetid, foldername) => {
    if (fulldata.length === 0) return null;
    if (fulldata.id === targetid) {
      return { ...fulldata, name: foldername };
    }
    let finalarr = [];
    finalarr = fulldata.children.map((e) => {
      return updateItem(e, targetid, foldername);
    });
    return { ...fulldata, children: finalarr };
  };

  return { addnewItem, deleteItem, updateItem };
};
