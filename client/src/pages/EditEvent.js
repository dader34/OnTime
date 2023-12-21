import React, { useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import GoogleMapPicker from '../components/GoogleMapPicker';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const DefaultLocation = { lat: 40.705476946658344, lng: -74.01381364332214 };
const DefaultZoom = 10;


const EditEvent = () => {
    const { id } = useParams();
    const [zoom, setZoom] = useState(DefaultZoom);
    const [submitted,setSubmitted] = useState(false)
    const { user, getCookie } = useAuth()
    const nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            imageUrl: '',
            date: '',
            categories: [],
            location: DefaultLocation,
            categoryInput: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().min(5, "Title must be at least 5 characters").max(20, "Title can be 20 characters max").required('Title is required'),
            description: Yup.string().min(10, "Description must be at least 10 characters").max(100, "Description can be 100 characters max").required('Description is required'),
            imageUrl: Yup.string().url('Invalid URL').required('Image URL is required'),
            date: Yup.string().required('Date and Time are required'),
        }),
        onSubmit: values => {
            if(!submitted){
                const postData = {
                    title: values.title,
                    description: values.description,
                    image_url: values.imageUrl,
                    date: values.date,
                    categories: values.categories,
                    location: `${values.location.lat},${values.location.lng}`,
                };
                fetch(`/events/${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': getCookie('csrf_access_token')
                    },
                    body: JSON.stringify(postData),
                    credentials: 'include'
                }).then(resp => {
                    if (resp.ok) {
                        //Check if user id matches event organizer id, if not alert that it doesnt match, and redirect to /
                        resp.json().then(data => {
                            nav(`/events/${data['success']}`)})
                    } else {
                        resp.json().then(err => toast.error(err.error || err.msg))
                    }
                }).catch(e => toast.error(e.message || e.msg))
            }else{
                toast.error("You have already submitted this event")
            }
            
        },
    });


    // Fetch event data when component mounts
    useEffect(() => {
        user?.id &&
            fetch(`/events/${id}`)
                .then(response => response.json())
                .then(
                    data => {
                        console.log(data.organizer_id === user.id)
                        console.log(data.organizer_id)
                        console.log(user.id)
                        if(data.organizer_id === user.id){
                            formik.setValues({
                                title: data.title || '',
                                description: data.description || '',
                                imageUrl: data.image_url || '',
                                date: data.date || '',
                                categories: data.categories.map(cat => cat.name) || [],
                                location: data.location
                                    ? { lat: parseFloat(data.location.split(',')[0]), lng: parseFloat(data.location.split(',')[1]) }
                                    : DefaultLocation,
                                categoryInput: ''
                            });
                        }else{
                            toast.error('You dont have permission to edit this post')
                            nav(`/events/${id}`)
                        }
                        
                    });
    }, [id, user]);

    const memoizedMapPicker = useMemo(() => {
        return (
          <GoogleMapPicker
            defaultLocation={formik.values.location}
            zoom={zoom}
            onChangeLocation={(lat, lng) => {
              formik.setFieldValue('location', { lat, lng });
            }}
          />
        );
      }, [formik.values.location, zoom]);


    const handleSubmit = async (e) => {
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
    const handleResetLocation = () => {
        formik.setFieldValue('location', { ...DefaultLocation });
        setZoom(DefaultZoom);
    };

    const handleAddCategory = () => {

        if (!formik.values.categories.map(e => e.toLowerCase()).includes(formik.values.categoryInput.toLowerCase())) {
            if (formik.values.categoryInput.match(/^[0-9a-z]+$/)) {
                if (formik.values.categoryInput.length >= 3 && formik.values.categoryInput.length <= 15) {
                    if (formik.values.categoryInput && formik.values.categories.length < 5) {
                        const newCategories = [...formik.values.categories, formik.values.categoryInput];
                        formik.setFieldValue('categories', newCategories);
                        formik.setFieldValue('categoryInput', '');
                    } else {
                        toast.error("Maximum of 5 categories allowed");
                    }
                } else {
                    toast.error("Category name must be between 3 and 15 characters")
                }
            } else {
                toast.error("Alphanumeric characters only")
            }
        } else {
            toast.error("That category is already selected")
        }

    };

    const handleRemoveCategory = (index) => {
        const filteredCategories = formik.values.categories.filter((_, idx) => idx !== index);
        formik.setFieldValue('categories', filteredCategories);
        console.log(formik.values.categories)
    };

    return (
        <div className="container mt-4">
            <h2>Create a New Event</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={formik.values.title} onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="4" value={formik.values.description} onChange={formik.handleChange} ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input className="form-control" id="imageUrl" value={formik.values.imageUrl} onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date and Time</label>
                    <input type="datetime-local" className="form-control" id="date" value={formik.values.date} onChange={formik.handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Categories</label>
                    <div className="input-group">
                        <input type="text" className="form-control" id="categoryInput" value={formik.values.categoryInput} onChange={e => formik.setFieldValue("categoryInput", e.target.value.toLowerCase())} placeholder="Add a category" />
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
                        {memoizedMapPicker}
                    </div>
                    <div className="mt-3 row">
                        <div className="col">
                            <label>Reset:</label>
                            <br />
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditEvent;
