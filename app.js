const { addNote, removeNote, listNodes, readNote } = require('./notes.js')
const yargs = require('yargs')

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addNote(argv.title, argv.body)
    }
})

// Remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
    }
})

// List
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: () => {
        listNodes()
    }
})

// Read
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        readNote(argv.title)
    }
})

// Initialize parsing with yargs
yargs.parse()

