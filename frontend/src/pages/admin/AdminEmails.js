import { useEffect, useState } from "react";

const AdminEmails = () => {
    const [emails, setEmails] = useState([]);

    const fetchEmails = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/inquiries/", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            const data = await response.json();
            setEmails(data);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div>
            <h2>Réclamations des utilisateurs</h2>
            <ul>
                {emails.map((email) => (
                    <li key={email.id}>
                        <strong>{email.subject}</strong>: {email.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminEmails;
