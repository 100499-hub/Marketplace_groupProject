import { useState } from 'react';
import { createItem } from '../services/items.service';

export const ItemForm = ({ onAdded }) => {
    const [form, setForm] = useState({ title:'', description:'', price:'' });

    const handleSubmit = async e => {
        e.preventDefault();
        const newItem = await createItem({
            title: form.title,
            description: form.description,
            price: +form.price
        });
        onAdded(newItem);
        setForm({ title:'', description:'', price:'' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>List a New Item</h3>
            <input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({...form, title:e.target.value})}
                required
            />
            <input
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({...form, description:e.target.value})}
            />
            <input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={e => setForm({...form, price:e.target.value})}
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
};
