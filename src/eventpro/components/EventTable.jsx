import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent, fetchEvents } from '../../store/slices/eventpro/eventSlice';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line react/prop-types
const EventTable = ({ setEditEvent }) => {
    const events = useSelector(state => state.events.events); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleDelete = async (eventId) => {
        try {
            await dispatch(deleteEvent(eventId));
            dispatch(fetchEvents()); // Refetch events to update the UI
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };
    const handleEdit = (event) => {
        navigate(`/add-event/${event._id}`, { state: { eventToEdit: event } });
    };
    

    const columns = [
        { name: 'Event Name', selector: row => row.eventName, sortable: true },
        { name: 'Event Type', selector: row => row.eventType, sortable: true },
        { name: 'Start Date', selector: row => row.startDate, sortable: true },
        { name: 'End Date', selector: row => row.endDate, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Handled By', selector: row => row.handledBy, sortable: true },
        { name: 'Organisation', selector: row => row.organisation, sortable: true },
        { name: 'Sub-events', selector: row => row.totalSubEvents, sortable: true },
        {
            cell: (row) => (
                <div>
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row._id)}>Delete</button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true
        }
    ];

    return (
        <div>
            <Helmet>
                <title>EventPro: Your Event, Perfectly Planned</title>
                <meta name="description" content="EventPro simplifies event planning with seamless organization, real-time updates, and easy collaboration, ensuring your event is perfectly executed every time." />
                <meta property="og:title" content="EventPro: Your Event, Perfectly Planned" />
                <meta property="og:description" content="EventPro simplifies event planning with seamless organization, real-time updates, and easy collaboration, ensuring your event is perfectly executed every time." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/eventpro-logo.png" />
                <meta property="og:image:alt" content="Sanjay Patidar" />
                <meta property="og:site_name" content="EventPro: Your Event, Perfectly Planned" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="EventPro: Your Event, Perfectly Planned" />
                <meta name="twitter:description" content="EventPro simplifies event planning with seamless organization, real-time updates, and easy collaboration, ensuring your event is perfectly executed every time." />
                <meta name="twitter:image" content="https://sanjaybasket.s3.ap-south-1.amazonaws.com/eventpro-logo.png" />
                <meta name="twitter:site" content="@sanjaypatidar" />
                <meta name="twitter:creator" content="@sanjaypatidar" />
                <meta name="keywords" content="event management, EventPro, event login, event dashboard, event planning, event organizer, event access, event management system, secure event login, event management tools,portfolio, verification, certificate verify, certification verification, signup, eduxcel, founder: Sanjay Patidar, tech, education, careers, opportunity, personal-portfolio, developer_sanju, sanjay, Sanjay, SANJAY, Sanjay Patidar, SANJAY PATIDAR, SANJAY WEB DEVELOPER, SANJAY DEVELOPER, Full Stack Web Developer, Mern Stack Web Developer, sanjay patidar, sanjay-patidar, professional, web developer portfolio, coder, web development, UI/UX design, Chandigarh University, EduXcel, Indore, contact, developer, programmer, engineer, AI, Artificial Intelligence, tech enthusiast, creativity, creator, work, technology, coding, projects, experiences, resume, cv" />
                <meta name="author" content="Sanjay Patidar" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'http://schema.org',
                        '@type': 'Person',
                        name: 'Sanjay Patidar',
                        birthDate: '1998-07-01',
                        birthPlace: {
                            '@type': 'Place',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Indore'
                            }
                        },
                        alumniOf: {
                            '@type': 'CollegeOrUniversity',
                            name: 'Chandigarh University',
                            location: {
                                '@type': 'Place',
                                address: {
                                    '@type': 'PostalAddress',
                                    addressLocality: 'Chandigarh',
                                    addressRegion: 'Punjab',
                                    addressCountry: 'India'
                                }
                            }
                        },
                        address: [
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Indore',
                                addressRegion: 'Madhya Pradesh',
                                postalCode: '452001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Chandigarh',
                                addressRegion: 'Punjab',
                                postalCode: '160001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Mumbai',
                                addressRegion: 'Maharashtra',
                                postalCode: '400001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Bangalore',
                                addressRegion: 'Karnataka',
                                postalCode: '560001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Delhi',
                                addressRegion: 'Delhi',
                                postalCode: '110001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Kolkata',
                                addressRegion: 'West Bengal',
                                postalCode: '700001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Chennai',
                                addressRegion: 'Tamil Nadu',
                                postalCode: '600001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Hyderabad',
                                addressRegion: 'Telangana',
                                postalCode: '500001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Pune',
                                addressRegion: 'Maharashtra',
                                postalCode: '411001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Ahmedabad',
                                addressRegion: 'Gujarat',
                                postalCode: '380001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Jaipur',
                                addressRegion: 'Rajasthan',
                                postalCode: '302001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Lucknow',
                                addressRegion: 'Uttar Pradesh',
                                postalCode: '226001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Bhopal',
                                addressRegion: 'Madhya Pradesh',
                                postalCode: '462001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Nagpur',
                                addressRegion: 'Maharashtra',
                                postalCode: '440001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Visakhapatnam',
                                addressRegion: 'Andhra Pradesh',
                                postalCode: '530001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Kochi',
                                addressRegion: 'Kerala',
                                postalCode: '682001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Guwahati',
                                addressRegion: 'Assam',
                                postalCode: '781001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Bhubaneswar',
                                addressRegion: 'Odisha',
                                postalCode: '751001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Dehradun',
                                addressRegion: 'Uttarakhand',
                                postalCode: '248001',
                                addressCountry: 'India'
                            },
                            {
                                '@type': 'PostalAddress',
                                addressLocality: 'Raipur',
                                addressRegion: 'Chhattisgarh',
                                postalCode: '492001',
                                addressCountry: 'India'
                            }
                        ],
                        worksFor: {
                            '@type': 'Organization',
                            name: 'HogwartsEdX'
                        },
                        url: 'https://HogwartsEdX.vercel.app/',
                        sameAs: [
                            'https://www.linkedin.com/in/sanjay-patidar-25b580292/',
                            'https://github.com/hello-developer-sanjay',
                            'https://www.instagram.com/sanjay_patidar_mcmxcviii/',
                            'https://HogwartsEdX.vercel.app/',
                            'https://HogwartsEdX.vercel.app/login',
                            'https://HogwartsEdX.vercel.app/certificate-verification'
                        ]
                    })}
                </script>
            </Helmet>
            <DataTable
                columns={columns}
                data={events}
                pagination
            />
        </div>
    );
};

export default EventTable;