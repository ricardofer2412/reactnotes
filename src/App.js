import React, { Component } from 'react';
import './App.css';
import Note from './components/Note/Note';
import NoteForm from './components/NoteForm/NoteForm';
import firebase from 'firebase';
import {DB_CONFIG} from './config/config'
import 'firebase/database';

class App extends Component {
  constructor(){
    super();
    this.state = {
      notes: [ 
     // {noteId: 1, noteContent: 'note 1'}, 
      //{noteId: 2, noteContent: 'note 2'} 
    ]  
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.db = this.app.database().ref().child('notes');

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    this.db.on('child_added', snap => {
      notes.push({
        noteId: snap.key,
        noteContent: snap.val().noteContent
      })
      this.setState({notes});
    });
  }

  removeNote(noteId){
      this.db.child(noteId).remove();
  }
  addNote(note){
 
    this.db.push().set({noteContent: note})

  }

  render() {
    return (
      <div className="notesContainer">
        <div className="notesHeader">
        <h1>Take my note</h1>
        </div>
        <div className="notesBody">
          <ul> 
          {
          this.state.notes.map(note => {
            return(
             <Note 
             noteContent={note.noteContent}
             noteId={note.noteId}
             key={note.noteId}
             removeNote={this.removeNote}
              />
            )
          } )
        }
          </ul>
        </div>
       
 
        <div className="notesFooter"> 
          <NoteForm 
          addNote={this.addNote}  />
        </div>
      </div>
      
    );
  }
}

export default App;
