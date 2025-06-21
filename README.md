<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EventEase: Ultimate Event Management Software for 2025</title>
    <meta name="description" content="EventEase is the premier event management software, offering real-time team collaboration and upcoming smart scheduling with Google Calendar integration." />
    <meta name="keywords" content="EventEase, event management software, event planning platform, smart scheduling, team collaboration, event organizer tool, event management app" />
    <meta name="author" content="Sanjay Patidar" />
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: #333;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2, h3 {
            color: #4a90e2;
        }
        img.logo {
            display: block;
            margin: 0 auto;
            max-width: 200px;
        }
        a {
            color: #4a90e2;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        ul {
            padding-left: 20px;
        }
        pre {
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        code {
            font-family: 'Courier New', Courier, monospace;
        }
        .section {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://mys3resources.s3.ap-south-1.amazonaws.com/LIC/eventlogo.png" alt="EventEase Logo" class="logo">
        <h1 align="center">EventEase: Ultimate Event Management Software for 2025</h1>
        <p align="center">
            <a href="https://event-ease-unified-event-manager.vercel.app">Live Demo</a> |
            <a href="https://github.com/yourusername/eventease-eventpro">GitHub Repository</a>
        </p>
        <p align="center">EventEase is the premier event management software, offering real-time team collaboration and upcoming smart scheduling with Google Calendar integration.</p>

        <div class="section">
            <h2>Table of Contents</h2>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#functionalities">Functionalities</a>
                    <ul>
                        <li><a href="#eventease-features">EventEase Features</a></li>
                        <li><a href="#eventpro-features">EventPro Features</a></li>
                        <li><a href="#shared-features">Shared Features</a></li>
                    </ul>
                </li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#usage">Usage</a></li>
                <li><a href="#contributing">Contributing</a></li>
                <li><a href="#license">License</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>

        <div class="section" id="about">
            <h2>About</h2>
            <p>EventEase + EventPro is a unified event management platform designed to streamline the planning, scheduling, and execution of events. EventEase specializes in webinar and calendar-based event management with seamless Google Calendar integration, while EventPro offers robust tools for managing diverse events like sports, music, and corporate gatherings. Built with a modern tech stack, the platform ensures a user-friendly experience, real-time collaboration, and secure authentication.</p>
            <p>Hosted at <a href="https://event-ease-unified-event-manager.vercel.app">event-ease-unified-event-manager.vercel.app</a>, the platform is responsive, scalable, and optimized for both organizers and attendees.</p>
        </div>

        <div class="section" id="functionalities">
            <h2>Functionalities</h2>

            <div id="eventease-features">
                <h3>EventEase Features</h3>
                <ul>
                    <li><strong>User Authentication</strong>: Secure login via email/password or Google OAuth for seamless access.</li>
                    <li><strong>Calendar View</strong>: Interactive calendar interface to visualize and manage events.</li>
                    <li><strong>Google Calendar Sync</strong>: Integrate with Google Calendar for smart scheduling and real-time updates (accessible at <code>/eventease/sync-google-calendar</code>).</li>
                    <li><strong>Event Creation</strong>: Create and manage webinar events with details like title, date, and description.</li>
                    <li><strong>Responsive Design</strong>: Optimized for mobile, tablet, and desktop devices.</li>
                    <li><strong>Admin Dashboard</strong>: Dedicated admin view for managing events and users (accessible at <code>/admin-dashboard</code> for admin roles).</li>
                </ul>
            </div>

            <div id="eventpro-features">
                <h3>EventPro Features</h3>
                <ul>
                    <li><strong>User Authentication</strong>: Login/register via email/password or Google OAuth, with role-based access (user/admin).</li>
                    <li><strong>Event Management</strong>:
                        <ul>
                            <li>Create events with fields like name, type (sports, music, etc.), start/end dates, description, handler, organization, and sub-events (via <code>/eventpro/add-event</code>).</li>
                            <li>Edit existing events with pre-filled forms (via <code>/eventpro/add-event/:id</code>).</li>
                            <li>Delete events with confirmation.</li>
                            <li>List events in a sortable, paginated data table (via <code>/eventpro/list-events</code>).</li>
                        </ul>
                    </li>
                    <li><strong>Dashboard</strong>: Personalized dashboard displaying user events and quick actions (via <code>/eventpro/dashboard</code> or <code>/eventpro/admin-dashboard</code> for admins).</li>
                    <li><strong>Forgot/Reset Password</strong>: Secure password recovery flow (via <code>/eventpro/forgot-password</code> and <code>/eventpro/reset-password/:token</code>).</li>
                    <li><strong>Form Validation</strong>: Client-side validation for event forms to ensure data integrity.</li>
                    <li><strong>Role-Based Access</strong>: Admins access enhanced features like user management.</li>
                    <li><strong>Responsive UI</strong>: Styled with styled-components for a modern, device-friendly interface.</li>
                </ul>
            </div>

            <div id="shared-features">
                <h3>Shared Features</h3>
                <ul>
                    <li><strong>Unified Routing</strong>: Seamless navigation between EventEase (<code>/eventease/*</code>) and EventPro (<code>/eventpro/*</code>) routes.</li>
                    <li><strong>Secure Authentication</strong>: Uses <code>x-auth-token</code> for API requests, stored in localStorage.</li>
                    <li><strong>Error Handling</strong>: Toast notifications for user feedback on actions (e.g., login failure, event creation success).</li>
                    <li><strong>SEO Optimization</strong>: Includes meta tags for title, description, keywords, and author.</li>
                    <li><strong>Cloud Backend</strong>: Integrates with <a href="https://eventmanager-api-19july.onrender.com">eventmanager-api-19july.onrender.com</a> for data persistence.</li>
                    <li><strong>Logging</strong>: Console logs for debugging auth, API calls, and navigation.</li>
                    <li><strong>Modern Tech Stack</strong>: Built with React, Redux Toolkit, React Router, Axios, and styled-components.</li>
                </ul>
            </div>
        </div>

        <div class="section" id="installation">
            <h2>Installation</h2>
            <p>Follow these steps to set up the project locally:</p>
            <ol>
                <li>Clone the repository:
                    <pre><code>git clone https://github.com/yourusername/eventease-eventpro.git</code></pre>
                </li>
                <li>Navigate to the project directory:
                    <pre><code>cd eventease-eventpro</code></pre>
                </li>
                <li>Install dependencies:
                    <pre><code>npm install</code></pre>
                </li>
                <li>Create a <code>.env</code> file in the root directory with the following:
                    <pre><code>REACT_APP_API_URL=https://eventmanager-api-19july.onrender.com/api</code></pre>
                </li>
                <li>Start the development server:
                    <pre><code>npm start</code></pre>
                </li>
            </ol>
            <p>The app will run at <code>http://localhost:3000</code>.</p>
        </div>

        <div class="section" id="usage">
            <h2>Usage</h2>
            <p>To use EventEase + EventPro:</p>
            <ol>
                <li>Visit <a href="https://event-ease-unified-event-manager.vercel.app">event-ease-unified-event-manager.vercel.app</a>.</li>
                <li>For EventEase:
                    <ul>
                        <li>Log in at <code>/eventease/login</code> using email or Google OAuth.</li>
                        <li>Sync with Google Calendar at <code>/eventease/sync-google-calendar</code>.</li>
                        <li>Create events at <code>/eventease/create-event</code>.</li>
                    </ul>
                </li>
                <li>For EventPro:
                    <ul>
                        <li>Log in or register at <code>/event-form</code>.</li>
                        <li>Access the dashboard at <code>/eventpro/dashboard</code>.</li>
                        <li>Add events at <code>/eventpro/add-event</code>.</li>
                        <li>View/edit events at <code>/eventpro/list-events</code>.</li>
                        <li>Recover password via <code>/eventpro/forgot-password</code>.</li>
                    </ul>
                </li>
                <li>Admins: Access <code>/eventpro/admin-dashboard</code> or <code>/admin-dashboard</code> for enhanced controls.</li>
            </ol>
            <p><strong>Note:</strong> Ensure a valid token is used for EventPro APIs, as expired tokens (e.g., <code>exp: 1750436359</code>) cause 401 errors. Obtain a new token via login.</p>
        </div>

        <div class="section" id="contributing">
            <h2>Contributing</h2>
            <p>Contributions are welcome! To contribute:</p>
            <ol>
                <li>Fork the repository.</li>
                <li>Create a feature branch:
                    <pre><code>git checkout -b feature/your-feature</code></pre>
                </li>
                <li>Commit changes:
                    <pre><code>git commit -m 'Add your feature'</code></pre>
                </li>
                <li>Push to the branch:
                    <pre><code>git push origin feature/your-feature</code></pre>
                </li>
                <li>Open a Pull Request.</li>
            </ol>
            <p>Please follow the <a href="https://github.com/yourusername/eventease-eventpro/blob/main/CONTRIBUTING.md">contributing guidelines</a>.</p>
        </div>

        <div class="section" id="license">
            <h2>License</h2>
            <p>This project is licensed under the MIT License. See the <a href="https://github.com/yourusername/eventease-eventpro/blob/main/LICENSE">LICENSE</a> file for details.</p>
        </div>

        <div class="section" id="contact">
            <h2>Contact</h2>
            <p>Author: Sanjay Patidar</p>
            <p>Email: <a href="mailto:sanjay@example.com">sanjay@example.com</a></p>
            <p>GitHub: <a href="https://github.com/yourusername">yourusername</a></p>
            <p>For support, open an issue on <a href="https://github.com/yourusername/eventease-eventpro/issues">GitHub</a>.</p>
        </div>
    </div>
</body>
</html>
