import { getDb } from '../config/db.js';
import { ObjectId } from 'mongodb';

const createUser = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('users').insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const db = getDb();
        const users = await db.collection('users').find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const db = getDb();
        const { id } = req.params;
        const result = await db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: req.body });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const db = getDb();
        const { id } = req.params;
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createUser,
    getUsers, 
    updateUser,
    deleteUser,
}