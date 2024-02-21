import React from "react";
import './ProfileList.css';
import {Container, Row} from 'react-bootstrap'; 
import ProfileCard from "./ProfileCard";

export default function ProfileList({list}) {
    console.log(list);
    return <Container className="profile-list">
        <Row>
            {list.map((profile, index) => (
                <ProfileCard key={index} name="dummy" className="profile-list-card"></ProfileCard>
            ))}
        </Row>

    </Container>
};