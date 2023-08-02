// import React, { useState } from 'react'
//import { AiFillFileAdd } from 'react-icons/ai'
//import { BiSolidChevronRight } from 'react-icons/bi';
import { PiFolderPlusLight, PiFilePlusLight } from 'react-icons/pi'
import { MdEdit, MdDelete } from 'react-icons/md'
import React, { useState } from 'react';
export default function Folder({ treeset, addItem, rename, delete_item }) {
  const [expand, setExpand] = useState(false);
  const operationType = React.useRef('new');
  const [minput, setInput] = useState({
    value: '',
    show: false,
    placeholder: '',
  });

  if (treeset.isfolder) {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <div className="flex justify-between rounded-md p-0.5 cursor-pointer mt-0.5 w-fit font-bold space-x-2 bg-gray-400" onClick={() => setExpand(!expand)}>
          <span className='mr-2'>📁</span>{treeset.name}
          {minput.show && (
            <input
            className='p-2'
              placeholder={minput.placeholder}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && e.target.value) {
                  if (operationType.current === 'new') {
                    minput.placeholder.toString().includes('folder')
                      ? addItem(treeset.id, minput.value, true)
                      : addItem(treeset.id, minput.value, false);
                  } else if (operationType.current === 'update') {
                    rename(treeset.id, minput.value);
                  }
                  setInput({
                    show: false,
                    value: '',
                    placeholder: '',
                  });
                }
              }}
              autoFocus
              value={minput.value}
              onChange={(e) => setInput({ ...minput, value: e.target.value })}
            />
          )}
          <div className="btns">
            <button
              onClick={(el) => {
                el.stopPropagation();
                setInput((e) => {
                  return {
                    ...e,
                    show: true,
                    placeholder: 'enter folder name',
                  };
                });
                operationType.current = 'new';
              }}
            >
              <PiFolderPlusLight size={25}/>
            </button>
            <button
              onClick={(el) => {
                el.stopPropagation();
                setInput({
                  ...minput,
                  show: true,
                  placeholder: 'enter file name',
                });
                operationType.current = 'new';
              }}
            >
              <PiFilePlusLight size={25}/>
            </button>
            <button
              onClick={() => {
                setInput({
                  ...minput,
                  show: true,
                  placeholder: 'enter new name',
                });
                operationType.current = 'update';
              }}
            >
              <MdEdit size={25}/>
            </button>
            <button
              onClick={(el) => {
                el.stopPropagation();
                delete_item(treeset.id);
              }}
            >
              <MdDelete size={25}/>
            </button>
          </div>
        </div>
        {expand &&
          treeset.children.map((e) => {
            return (
              <Folder
                key={e.id}
                treeset={e}
                addItem={addItem}
                rename={rename}
                delete_item={delete_item}
              />
            );
          })}
      </div>
    );
  } else {
    return (
      <div className="file text-black hover:text-blue-500" key={treeset.id}>
        📄{treeset.name}
        <div className="btns mx-0.5">
          {minput.show && (
            <input
              className='rounded-md'
              placeholder={minput.placeholder}
              onKeyDown={(el) => {
                if (el.keyCode === 13 && el.target.value) {
                  if (operationType.current === 'new') {
                    minput.placeholder.toString().includes('folder')
                      ? addItem(treeset.id, minput.value, true)
                      : addItem(treeset.id, minput.value, false);
                  } else if (operationType.current === 'update') {
                    rename(treeset.id, minput.value);
                  }
                  setInput({
                    show: false,
                    value: '',
                    placeholder: '',
                  });
                }
              }}
              autoFocus
              value={minput.value}
              onChange={(e) => setInput({ ...minput, value: e.target.value })}
            />
          )}
          <button
            onClick={() => {
              console.log('clicked');
              setInput({
                ...minput,
                show: true,
                placeholder: 'enter new name',
              });
              operationType.current = 'update';
            }}
          >
            <MdEdit size={21}/>
          </button>
          <button
            onClick={(el) => {
              el.stopPropagation();
              delete_item(treeset.id);
            }}
          >
            <MdDelete size={22}/>
          </button>
        </div>
      </div>
    );
  }
}
