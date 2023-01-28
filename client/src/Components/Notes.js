import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/noteContext';
import Noteitem from './Noteitem';

const Notes = () => {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		getNotes();
	}, []);

	// to updata a note
	const [note, setNote] = useState({ id: '', etitle: '', etasks: '' });

	const ref = useRef(null);
	const refClose = useRef(null);

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			etasks: currentNote.tasks,
		});
	};

	// for form to edit

	const handleSubmit = (e) => {
		e.preventDefault();
		editNote(note.id, note.etitle, note.etasks);
		refClose.current.click();
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	return (
		<>
			{/*  Button trigger modal */}
			<button
				ref={ref}
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
			>
				Launch demo modal
			</button>

			{/*  Modal */}
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">
								Edit your note
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<input
										value={note.etitle}
										type="text"
										id="etitle"
										name="etitle"
										placeholder="Title"
										required
										onChange={onChange}
										className="form-control"
									/>
								</div>
								<div className="mb-3">
									<input
										value={note.etasks}
										type="text"
										id="etasks"
										name="etasks"
										placeholder="Notes"
										required
										onChange={onChange}
										className="form-control"
									/>
								</div>
								<button type="submit" className="btn btn-primary">
									Submit
								</button>
								<button
									ref={refClose}
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			{/* Edit modal ends */}
			<div className="row my-3">
				{notes.map((note) => {
					return (
						<Noteitem key={note._id} note={note} updateNote={updateNote} />
					);
				})}
			</div>
		</>
	);
};

export default Notes;