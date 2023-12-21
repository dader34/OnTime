import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EventView.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import GoogleMap from "../components/GoogleMap";
import '../styles/EventView.css'

const EventView = () => {
    const [event, setEvent] = useState({});
    const [attending, setAttending] = useState(false);
    const { id } = useParams();
    const { user, getCookie } = useAuth();
    const [owner, setOwner] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        user?.id &&
            id &&
            fetch(`/events/${id}`)
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then(setEvent);
                    } else {
                        nav("/");
                    }
                })
                .catch((e) => toast.error(e.message));

        fetch("/user", {
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((data) => {
                        const ids = data.events.map((e) => e.id);
                        if (ids.includes(parseInt(id))) {
                            setAttending(true);
                        }

                        const oids = data.organized_events.map((e) => e.id);
                        if (oids.includes(parseInt(id))) {
                            setOwner(true);
                        }
                    });
                }
            })
            .catch((e) => toast.error(e.message));
    }, [id, user, nav, getCookie]);


    const handleRSVP = () => {
        fetch("/rsvp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
            body: JSON.stringify({ event_id: parseInt(id) }),
            credentials: "include",
        })
            .then((resp) =>
                resp
                    .json()
                    .then((data) =>
                        resp.ok
                            ? setEvent({ ...event, users: data["attendees"] })
                            : toast.error(data["error"] || data.msg),
                    ),
            )
            .catch((e) => toast.error(e.message || e.msg));
        setAttending((current) => !current);
    };

    const handleDeletePost = () => {
        fetch(`/events/${id}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": getCookie("csrf_access_token"),
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    toast.success("Post deleted!");
                    nav("/");
                } else {
                    resp.json().then((err) => toast.error(err.error || err.msg));
                }
            })
            .catch((e) => toast.error(e.message));
    };

    const handleDelete = () => {
        toast((t) => (
            <div>
                <strong>Are you sure?</strong>
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <button
                        className="btn btn-secondary btn-sm me-2"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Dismiss
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                            handleDeletePost();
                            toast.dismiss(t.id);
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ));
    };

    const createGoogleCalendarEventUrl = () => {
        const title = encodeURIComponent(event?.title);
        const description = encodeURIComponent(event?.description);
        const location = encodeURIComponent(event?.location);
        const startTime = convertToGoogleCalendarDateTime(event?.date);
        const endTime = convertToGoogleCalendarDateTime(event?.date);

        window.open(
            `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}&location=${location}`,
            "_blank",
        );
    };

    const convertToGoogleCalendarDateTime = (dateString) => {
        const date = new Date(dateString);
        // Format the date to YYYYMMDDTHHmmssZ (Google Calendar format)
        return (
            date
                .toISOString()
                .replace(/-|:|\.\d\d\d/g, "")
                .slice(0, -1) + "Z"
        );
    };

    const convertToLocaleString = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice();
    };

    return event?.title ? (
        <div className="page-container">
            <div className="container mt-4">
                <div className="jumbotron">
                    <img
                        src={event.image_url}
                        alt={event.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                        onError={({ currentTarget }) => {
                            currentTarget.src =
                                "https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=150 150w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=300 300w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=600 600w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=800 800w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1200 1200w, https://images.pexels.com/photos/860227/pexels-photo-860227.jpeg?auto=compress&cs=tinysrgb&w=1600 1600w";
                        }}
                    />
                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="event-view-container">
                            <h2 className="text-primary">{event.title}</h2>
                            <p>
                                <strong>Host:</strong> {event?.organizer?.name}
                            </p>
                            <p>
                                <strong>Date: {convertToLocaleString(event.date)}</strong>
                            </p>
                            <p>
                                <strong>Location:</strong>
                            </p>
                            {event.location && (
                                <GoogleMap
                                    lat={parseFloat(event.location.split(",")[0])}
                                    lng={parseFloat(event.location.split(",")[1])}
                                    zoom={15}
                                />
                            )}
                            <p>
                                <strong>Description:</strong> {event.description}
                            </p>
                            {event?.categories?.length && (
                                <>
                                    <strong style={{ color: "black" }}>Categories:</strong>{" "}
                                    {event.categories.map((cat) => (
                                        <span key={`cat.name-${Math.random()}`} className="category-tag">
                                            {cat.name}
                                        </span>
                                    ))}
                                </>
                            )}
                            <p>
                                <strong>Attendees:</strong> {event.users ? event.users.length : 0}
                            </p>

                            <br />

                            {owner ? (
                                <div
                                    className="d-flex justify-content-center mt-3"
                                    style={{ flexDirection: "column" }}
                                >
                                    <button
                                        className="btn btn-primary me-3"
                                        onClick={() => nav(`/events/${id}/edit`)}
                                        style={{ width: "100%" }}
                                    >
                                        Edit Event
                                    </button>
                                    <br />
                                    <button className="btn btn-danger" onClick={handleDelete}>
                                        Delete Event
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="d-flex justify-content-center mt-3"
                                    style={{ flexDirection: "column" }}
                                >
                                    <button
                                        className={`btn ${attending ? "btn-danger" : "btn-success"}`}
                                        onClick={handleRSVP}
                                    >
                                        {!attending ? "I'm in!" : "Withdraw"}
                                    </button>
                                    <br />

                                    <button
                                        onClick={createGoogleCalendarEventUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Add to Google Calendar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="page-container">
            <h1>Loading...</h1>
        </div>
    )
};

export default EventView;
