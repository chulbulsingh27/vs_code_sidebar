// import { useState } from "react";
// import Folder from "./components/Folder";
// import explorer from "./data/folderData";
// import Traversal from "./hooks/Traversal";
// function App() {
//   const[explorerData,setExplorerData] = useState(explorer)//it returns two things one the state and another the updater function which changes the state
//   const {insertNode,deleteNode,renameNode} = Traversal();

//   const handleInsertNode = (folderId,item,isFolder) => {
//     const finalTree = insertNode(explorerData,folderId,item,isFolder)
//     setExplorerData(finalTree)
//   }
//   const handleDeleteNode = (folderId) => {
//     const finalTree = deleteNode(explorerData,folderId)
//     setExplorerData(finalTree)
//   }
//   const handleRenameNode = (folderID, item) => {
//     const finalTree = renameNode(explorerData,folderID, item)
//     setExplorerData(finalTree)
//   }
//   return (
//     <div className="App">
//       {/* passing down a state as a prop */}
//       <Folder handleInsertNode={handleInsertNode} handleRenameNode={handleRenameNode} handleDeleteNode={handleDeleteNode} explorer={explorerData}/>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import Folder from './components/Folder';
import { Traversal } from './hooks/Traversal';
import { folderData } from './data/folderData';
import './App.css'
export default function App() {
  const [treeset, setTreeset] = useState(folderData);
  const { addnewItem, updateItem, deleteItem } = Traversal();
  const addItem = (id, name, isfolder) => {
    setTreeset(addnewItem(treeset, id, name, isfolder));
  };

  const rename = (id, name) => {
    setTreeset(updateItem(treeset, id, name));
  };
  const delete_item = (id) => {
    setTreeset(deleteItem(treeset, id));
  };

  return (
    <div className='w-[800px] bg-slate-200 absolute top-20 ml-[400px]'>
      {console.log('updatedarry', treeset)}
      <p className='text-2xl font-semibold ml-2'>Press Enter to submit the input value</p>
      <Folder
        treeset={treeset}
        addItem={addItem}
        rename={rename}
        delete_item={delete_item}
      />
    </div>
  );
}
