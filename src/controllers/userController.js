import { User } from '../models/index.js';

export const createUser = async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const user = await User.create({ name, email, age });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const [updated] = await User.update({ name, email, age }, { where: { id }, returning: true });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
