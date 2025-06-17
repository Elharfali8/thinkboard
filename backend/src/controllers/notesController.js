import Note from '../models/Note.js'

export async function getAllNotes (_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }) // Sort by creation date, newest first
        res.status(200).json(notes)
    } catch (error) {
        console.log('Error in getAllNotes:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export async function getNoteById(req, res) {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log('Error in getNoteById controller:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title, content })

        const savedNote = await note.save()
        res.status(201).json(savedNote)
    } catch (error) {
        console.log('Error in createNote controller:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }   
}

export async function updateNote (req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            {new: true,} // Return the updated document
        );

        if (!updatedNote) {
            return res.status(404).json({message: 'Note not found'});
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.log('Error in updateNote controller:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export async function deleteNote (req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id)
        if (!deletedNote) {
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        console.log('Error in deleteNote controller:', error);
        res.status(500).json({message: 'Internal Server Error'})
    }
}