import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import MapPicker from 'react-google-map-picker';

const DefaultLocation = { lat: 40.705476946658344, lng: -74.01381364332214 };
const DefaultZoom = 10;

const CreateEvent = () => {
  const [zoom, setZoom] = useState(DefaultZoom);

  

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      imageUrl: '',
      date: '',
      categories: [],
      location: `${DefaultLocation.lat},${DefaultLocation.lng}`,
      categoryInput: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().min(5,"Title must be at least 5 characters").max(20,"Title can be 20 characters max").required('Title is required'),
      description: Yup.string().min(10,"Description must be at least 10 characters").max(100,"Description can be 100 characters max").required('Description is required'),
      imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
      date: Yup.string().required('Date and Time are required'),
    }),
    onSubmit: values => {
      const postData = {
        ...values,
        location: `${values.location.lat},${values.location.lng}`,
        zoom: zoom,
      };
      // toast.success("Event created successfully!");
    },
  });

  // @validates('title')
  //   def title_validation(self,key,title):
  //       if title is not None and isinstance(title,str) and (5 <= len(title) <= 20):
  //           return title
  //       else:
  //           raise ValueError('Title must be a str between 5 and 20 chars')
        
  //   @validates('description')
  //   def description_validation(self,key,description):
  //       if description is not None and isinstance(description,str) and (10 <= len(description) <= 100):
  //           return description
  //       else:
  //           raise ValueError('Description must be a str between 10 and 100 chars')

  const handleSubmit = async(e) => {
    console.log(formik.values)
    e.preventDefault();
    await formik.submitForm()

    const errors = await formik.validateForm();
    
    const errorKeys = Object.keys(errors)

    if (Object.keys(errors).length > 0) {
      console.log(errors[errorKeys[0]])
      toast.error(errors[errorKeys[0]])
    }
    
  };

  const handleChangeLocation = (lat, lng) => {
    formik.setFieldValue('location', { lat, lng });
  };

  const handleChangeZoom = newZoom => {
    setZoom(newZoom);
  };

  const handleResetLocation = () => {
    formik.setFieldValue('location', { ...DefaultLocation });
    setZoom(DefaultZoom);
  };

  const handleAddCategory = () => {
    if (formik.values.categoryInput && formik.values.categories.length < 5) {
      const newCategories = [...formik.values.categories, formik.values.categoryInput];
      formik.setFieldValue('categories', newCategories);
      formik.setFieldValue('categoryInput', '');
    } else {
      toast.error("Maximum of 5 categories allowed");
    }
  };

  const handleRemoveCategory = (index) => {
    const filteredCategories = formik.values.categories.filter((_, idx) => idx !== index);
    formik.setFieldValue('categories', filteredCategories);
  };

  return (
    <div className="container mt-4">
      <h2>Create a New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={formik.values.title} onChange={formik.handleChange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="4" value={formik.values.description} onChange={formik.handleChange} ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input className="form-control" id="imageUrl" value={formik.values.imageUrl} onChange={formik.handleChange}  />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date and Time</label>
          <input type="datetime-local" className="form-control" id="date" value={formik.values.date} onChange={formik.handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="categories" className="form-label">Categories</label>
          <div className="input-group">
            <input type="text" className="form-control" id="categoryInput" value={formik.values.categoryInput} onChange={formik.handleChange} placeholder="Add a category" />
            <button type="button" className="btn btn-outline-secondary" onClick={handleAddCategory} disabled={formik.values.categories.length >= 5}>+</button>
          </div>
          <div>
            {formik.values.categories.map((category, index) => (
              <span key={index} className="badge bg-secondary me-2">
                {category}
                <button type="button" className="btn btn-sm btn-danger ms-2" onClick={() => handleRemoveCategory(index)}>X</button>
              </span>
            ))}
          </div>
        </div>
        <div id="mapsContainer">
          <div className="mt-4">
            <MapPicker
              defaultLocation={formik.values.location}
              zoom={zoom}
              mapTypeId="roadmap"
              style={{ height: '500px' }}
              onChangeLocation={handleChangeLocation}
              onChangeZoom={handleChangeZoom}
              apiKey='AIzaSyA9f3qBwiomORS2T1H-0L5lPX3LcqDureU' // Replace with your API Key
            />
          </div>
          <div className="mt-3 row">
            <div className="col">
              <label>Reset:</label>
              <br/>
              <button className="btn btn-secondary" onClick={handleResetLocation}>Reset Location</button>
            </div>
            <div className="col">
              <label>Latitude:</label>
              <input type='text' value={formik.values.location.lat} disabled className="form-control" />
            </div>
            <div className="col">
              <label>Longitude:</label>
              <input type='text' value={formik.values.location.lng} disabled className="form-control" />
            </div>
            <div className="col">
              <label>Zoom:</label>
              <input type='text' value={zoom} disabled className="form-control" />
            </div>
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
