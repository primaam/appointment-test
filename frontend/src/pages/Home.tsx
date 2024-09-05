import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface HomeProps {
    role?: "ADMIN" | "HR" | "VENDOR";
}

const Home: React.FC<HomeProps> = ({ role }) => {
    const [activeTab, setActiveTab] = useState<number>(0);
    const [openEventModal, setOpenEventModal] = useState<boolean>(false);
    const { user } = useSelector((state: RootState) => ({
        user: state.userReducer.user,
    }));

    const userRole = user != null ? user.role : "VENDOR";

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleCreateEvent = () => {
        setOpenEventModal(true);
    };

    const handleCloseEventModal = () => {
        setOpenEventModal(false);
    };

    return (
        <Container>
            <Header>Appointment App</Header>

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                style={{
                    backgroundColor: "red",
                }}
            >
                {userRole === "HR" || userRole === "ADMIN" ? <Tab label="Pre-Event" /> : null}
                <Tab label="Events" />
            </Tabs>

            <div style={{ marginTop: "20px" }}>
                {/* Pre-Event Tab Content */}
                {activeTab === 0 && (userRole === "HR" || userRole === "ADMIN") && (
                    <div>
                        <Typography variant="h5">Pre-Event Options</Typography>
                        {/* List Pre-Event Options and Create Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateEvent}
                            style={{ marginTop: "10px" }}
                        >
                            Create New Pre-Event
                        </Button>
                        {/* Modal untuk Create Pre-Event (Opsional) */}
                        {openEventModal && (
                            <div>
                                {/* Form Modal */}
                                <Typography variant="h6">Pre-Event Form</Typography>
                                <Button onClick={handleCloseEventModal}>Close</Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Events Tab Content */}
                {(activeTab === 1 || (activeTab === 0 && userRole === "VENDOR")) && (
                    <div>
                        <Typography variant="h5">Events</Typography>
                        {/* Display List of Events */}
                        <div>
                            <Typography variant="body1">Event 1</Typography>
                            <Typography variant="body1">Event 2</Typography>
                        </div>
                        {userRole === "HR" && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateEvent}
                                style={{ marginTop: "10px" }}
                            >
                                Create New Event
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Home;

const Header = styled(Typography)(({ theme }) => ({
    textAlign: "center",
    marginBottom: "10vh",
    fontSize: "24px",
}));
