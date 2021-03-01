import React, { useContext, useEffect, useState } from 'react';
import { villasContext } from '../../../contexts/VillaContext';
import { Link, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EditVilla = () => {
  const classes = useStyles();

  const { forEdit, saveNewEditVilla, editVilla } = useContext(villasContext); 
  const [edit, setEdit] = useState(null); 
  const { id } = useParams()

  useEffect(() => {
    setEdit(forEdit)
  }, [forEdit])

  useEffect(() => {
    editVilla(id)
  }, [id])

  function handleEditInp(e) {
    let newObj = {
      ...edit,
      [e.target.name]: e.target.value
    }
    setEdit(newObj)
    console.log(newObj)
  }

  return (
    <>
      {edit ? 
      
      
      <div className="edit-block">
        <div className="form edit-page">
          <h2>Edit</h2>
          <input onChange={handleEditInp} value={edit.title} type="text" name="title" id="" />
          <input onChange={handleEditInp} value={edit.description} type="text" name="description" id="" />
          <input onChange={handleEditInp} value={edit.price} type="text" name="price" id="" />
          <input onChange={handleEditInp} value={edit.size} type="text" name="size" id="" />
          <input onChange={handleEditInp} value={edit.place} type="text" name="place" id="" />
          <input onChange={handleEditInp} value={edit.image} type="text" name="image" id="" />
          <Link to="/add" >
            <button onClick={() => saveNewEditVilla(edit)} >Save</button>
          </Link>
        </div>
      </div>
        : <h1>loading...</h1>
      }

    </>
  );
};

export default EditVilla;