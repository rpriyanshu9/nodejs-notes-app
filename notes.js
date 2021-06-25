const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        const note = {
            title, body
        }
        notes.push(note)
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note added!"))
    } else {
        console.log(chalk.red.inverse("Title already exists!!!"))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        const notes = JSON.parse(dataJSON)
        return notes
    } catch (error) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const note = notes.filter(note => note.title === title)
    if (note.length === 0) {
        console.log(chalk.red.inverse("Note with given title doesnt exist!!"))
    } else {
        const updatedNotes = notes.filter(note => note.title !== title)
        saveNotes(updatedNotes)
        console.log(chalk.green.inverse("Note with title: '" + title + "' deleted!!"))
    }
}

const listNodes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.cyan.bold("Your Notes: "))
        notes.forEach(element => {
            console.log(`-> ${chalk.bold(element.title)}:`, chalk.italic(element.body))
        })
    } else {
        console.log(chalk.redBright("No notes available"))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (!note) {
        console.log(chalk.red.inverse("No note found!!"))
    } else {
        console.log(`${chalk.bold(note.title)}:`, note.body);
    }
}

module.exports = {
    addNote, removeNote, listNodes, readNote
}