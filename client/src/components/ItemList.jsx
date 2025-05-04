import { useState, useEffect } from 'react';
import { getAllItems, updateItem } from '../services/items.service.js';
import { ItemForm } from './ItemForm';
import { ItemRow } from './ItemRow';

export const ItemList = () => {
    const [items, setItems]     = useState([]);
    const [editing, setEditing] = useState(null);

    useEffect(() => {
        getAllItems().then(setItems);
    }, []);

    const addItem = i => setItems(prev => [i, ...prev]);
    const removeItem = id => setItems(prev => prev.filter(x => x._id !== id));

    const saveEdit = async data => {
        const updated = await updateItem(data._id, data);
        setItems(prev => prev.map(x => x._id === updated._id ? updated : x));
        setEditing(null);
    };

    return (
        <>
            {editing
                ? <ItemForm key={editing._id} onAdded={saveEdit} {...editing} />
                : <ItemForm onAdded={addItem} />
            }

            <table>
                <thead>
                <tr><th>Title</th><th>Price</th><th>Owner</th><th>Action</th></tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <ItemRow
                        key={item._id}
                        item={item}
                        onDeleted={removeItem}
                        onEdit={setEditing}
                    />
                ))}
                </tbody>
            </table>
        </>
    );
};
