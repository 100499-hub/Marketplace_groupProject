import { useContext } from 'react';
import { useLogin } from '../context/UserContext';
import { deleteItem, buyItem } from '../services/items.service';

export const ItemRow = ({ item, onDeleted, onEdit }) => {
    const { currentUser } = useLogin();
    const isOwner = item.owner._id === currentUser._id;

    const handleDelete = async () => {
        await deleteItem(item._id);
        onDeleted(item._id);
    };

    const handleBuy = async () => {
        await buyItem(item._id);
        onDeleted(item._id);
    };

    return (
        <tr>
            <td>{item.title}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.owner.userName}</td>
            <td>
                {isOwner
                    ? <>
                        <button onClick={()=>onEdit(item)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                    : <button onClick={handleBuy}>Buy this item</button>
                }
            </td>
        </tr>
    );
};
